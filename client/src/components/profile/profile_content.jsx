import React, { Component } from "react";
import {
  getUser,
  getUserMembership,
  addComment,
  getComments,
  addReport,
  getPostsByAuthor,
  userAbout,
} from "../api/apiCall.js";
import MUIRichTextEditor from "mui-rte";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";

export const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

Object.assign(defaultTheme, {
  overrides: {
    MuiIconButton: {
      root: {
        color: "aliceblue",
      },
    },
    MUIRichTextEditor: {
      root: {
        backgroundColor: "rgb(52,58,64)",
        color: "aliceblue",
        borderRadius: "10px",
      },
      container: {
        // display: "flex",
        // flexDirection: "column-reverse",
        // fontColor: "red"
      },
      editor: {
        backgroundColor: "rgb(52,58,64)",
        padding: "20px",
        height: "200px",
        maxHeight: "200px",
        overflow: "auto",
        borderRadius: "10px",
      },
      toolbar: {
        border: "0px solid gray",
        backgroundColor: "rgb(52,58,64)",
        color: "aliceblue",
        borderRadius: "10px",
      },
      placeHolder: {
        backgroundColor: "rgb(52,58,64)",
        paddingLeft: 20,
        width: "inherit",
        // position: "absolute",
        position: "static",
        top: "20px",
      },
      anchorLink: {
        color: "#333333",
        textDecoration: "underline",
      },
    },
  },
});

export const eventTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

Object.assign(eventTheme, {
  overrides: {
    MuiIconButton: {
      root: {
        color: "aliceblue",
        borderRadius: "10px",
      },
    },
    MUIRichTextEditor: {
      root: {
        backgroundColor: "rgb(39,162,67)",
        color: "aliceblue",
        borderRadius: "10px",
      },
      container: {
        // display: "flex",
        // flexDirection: "column-reverse",
        // fontColor: "red"
      },
      editor: {
        backgroundColor: "rgb(39,162,67)",
        padding: "20px",
        height: "200px",
        maxHeight: "200px",
        overflow: "auto",
        borderRadius: "10px",
      },
      toolbar: {
        borderTop: "0px solid gray",
        backgroundColor: "rgb(39,162,67)",
        color: "aliceblue",
        borderRadius: "10px",
      },
      placeHolder: {
        backgroundColor: "rgb(39,162,67)",
        paddingLeft: 20,
        width: "inherit",
        // position: "absolute",
        position: "static",
        top: "20px",
        borderRadius: "10px",
      },
      anchorLink: {
        color: "#333333",
        textDecoration: "underline",
      },
    },
  },
});

class Content extends Component {
  state = {
    Posts: [],
    down: true,
    Club: [{ rating: 0 }],
    user: [],
    isInSameClub: 1,
    comment: "",
    postId: "",
    Comments: [],
    report: "",
    about: "",
    members: [],
    itself: false,
  };

  componentDidMount() {
    getPostsByAuthor(this.props.match.params.userId).then((response) => {
      let list = response.reverse();
      this.setState({ Posts: list });
    });
    getUserMembership(this.props.userId).then((response) => {
      getUserMembership(this.props.match.params.userId).then((response2) => {
        let done = 0;
        for (let i = 0; i < response.length; i++) {
          for (let k = 0; k < response2.length; k++) {
            if (response[i].subClub === response2[k].subClub) done = 1;
          }
          if (done === 1) break;
        }
        if (done === 0) this.setState({ isInSameClub: 0 });
      });
    });
    getComments().then((response) => {
      this.setState({ Comments: response });
    });
    getUser(this.props.match.params.userId).then((response) => {
      this.setState({ user: response });
    });
    if (this.props.userId === this.props.match.params.userId) {
      this.setState({ itself: true });
    }
  }

  changeDown = () => {
    if (this.state.down === true) this.setState({ down: false });
    else this.setState({ down: true });
  };

  goBack = () => {
    window.history.back();
  };

  convertToDraft = (str) => {
    if (str.length > 10 && str.substring(0, 10) === '{"blocks":') {
      return str;
    }
    const contentHTML = convertFromHTML(str);
    const state = ContentState.createFromBlockArray(
      contentHTML.contentBlocks,
      contentHTML.entityMap
    );
    return JSON.stringify(convertToRaw(state));
  };

  givePostId = (postId) => {
    this.setState({ postId });
  };

  onChange = (data) => {
    this.setState({
      report: data.target.value,
    });
  };

  onChange2 = (data) => {
    this.setState({
      about: data.target.value,
    });
  };

  onChange3 = (data) => {
    this.setState({
      comment: data.target.value,
    });
  };

  reportUser = (targetuser, targetpost) => {
    let report = {
      reporterId: this.props.userId,
      targetId: targetuser,
      reason: this.state.report,
      targetPost: targetpost,
    };
    addReport(report);
  };

  postComment = () => {
    let post = {
      postId: this.state.postId,
      userId: parseInt(this.props.userId),
      text: this.state.comment,
    };
    let comments = this.state.Comments;
    comments.push(post);
    this.setState({ Comments: comments });
    addComment(post);
  };

  aboutEdit = () => {
    let about = {
      id: this.props.userId,
      about: this.state.about,
    };
    let user = this.state.user[0];
    user.about = this.state.about;
    this.setState({ user: [user] });
    userAbout(about);
  };

  render() {
    if (this.state.itself) {
      return (
        <div className="container row" style={{ marginTop: "100px" }}>
          <div className="col-9">
            {this.state.Posts.map((element) => {
              let target = "#Collapse" + element.postId;
              let heading = "heading" + element.postId;
              let downclass = "fa fa-angle-double-down";
              let upclass = "fa fa-angle-double-up";
              let event = element.isEvent;
              let cardclass =
                event === 0
                  ? "card text-white bg-dark"
                  : " card text-white bg-success";
              let finalclass = this.state.down === false ? upclass : downclass;
              let comment_counter = 1;

              return (
                <div
                  id="accordion"
                  key={element.postId}
                  style={{ marginBottom: "20px" }}
                >
                  <div className={cardclass}>
                    <div className="card-header" id={heading}>
                      <h5 className="mb-0">{element.title + " "}</h5>
                      <i
                        className={finalclass}
                        aria-hidden="true"
                        data-toggle="collapse"
                        data-target={target}
                        aria-expanded="true"
                        aria-controls={"Collapse" + element.postId}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: "10px",
                          bottom: "10px",
                        }}
                        onClick={
                          (this.changeDown,
                          () => this.givePostId(element.postId))
                        }
                      ></i>
                    </div>

                    <div
                      id={"Collapse" + element.postId}
                      className="collapse"
                      aria-labelledby={heading}
                      data-parent="#accordion"
                    >
                      <div
                      // className='card-body'
                      // dangerouslySetInnerHTML={{ __html: element.text }}
                      >
                        <MuiThemeProvider
                          theme={
                            element.isEvent == 0 ? defaultTheme : eventTheme
                          }
                          key={"muitheme" + element.postId}
                        >
                          <MUIRichTextEditor
                            defaultValue={this.convertToDraft(element.text)}
                            readOnly={true}
                            toolbar={false}
                            key={"mui" + element.postId}
                          />
                        </MuiThemeProvider>
                      </div>
                      <div>
                        <i
                          className="fa fa-comments"
                          aria-hidden="true"
                          style={{
                            marginLeft: "20px",
                            marginBottom: "10px",
                            cursor: "pointer",
                          }}
                          data-toggle="modal"
                          data-target={"#modal" + element.postId}
                        ></i>
                        <i
                          className="fa fa-flag"
                          aria-hidden="true"
                          style={{
                            marginLeft: "10px",
                            marginBottom: "10px",
                            cursor: "pointer",
                          }}
                          data-toggle="modal"
                          data-target={"#modal1" + element.postId}
                        ></i>
                        <i
                          className="fa fa-share-alt"
                          aria-hidden="true"
                          style={{
                            marginLeft: "10px",
                            marginBottom: "10px",
                            cursor: "pointer",
                          }}
                        ></i>

                        <div
                          className="modal fade "
                          id={"modal" + element.postId}
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog bg-dark"
                            style={{ borderRadius: "10px" }}
                            role="document"
                          >
                            <div
                              className="modal-content bg-dark"
                              style={{ borderRadius: "10px" }}
                            >
                              <div
                                className="modal-header"
                                style={{ border: "0px" }}
                              >
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  Comments
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  style={{ color: "white" }}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div
                                className="modal-body"
                                style={{
                                  maxHeight: "700px",
                                  scrollBehavior: "smooth",
                                  overflow: "auto",
                                }}
                              >
                                {this.state.Comments.map((comment) => {
                                  if (comment.postId === this.state.postId) {
                                    return (
                                      <div className="card bg-dark">
                                        <div className="card-body">
                                          <h5 className="card-title">
                                            {"#" + comment_counter++}
                                          </h5>
                                          <p className="card-text">
                                            {comment.text}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                              <div className="modal-footer">
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => this.onChange3(e)}
                                  defaultValue=""
                                  placeholder="Comment Here."
                                ></input>
                                <button
                                  type="button"
                                  className="btn btn-outline-success"
                                  onClick={this.postComment}
                                >
                                  Post Comment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="modal fade"
                          id={"modal1" + element.postId}
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog bg-dark"
                            style={{ borderRadius: "10px" }}
                            role="document"
                            role="document"
                          >
                            <div
                              className="modal-content bg-dark"
                              style={{ borderRadius: "10px" }}
                            >
                              <div
                                className="modal-header"
                                style={{ border: "0px" }}
                              >
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  Report
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  style={{ color: "white" }}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => this.onChange(e)}
                                  defaultValue=""
                                  placeholder="Please state your reason briefly."
                                ></input>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-outline-danger"
                                  data-dismiss="modal"
                                  onClick={() =>
                                    this.reportUser(
                                      element.authorId,
                                      element.postId
                                    )
                                  }
                                >
                                  Report User
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-3">
            <div className="card text-white bg-dark">
              <div
                className="card-header"
                style={{ textAlign: "center", fontWeight: "500" }}
              >
                About Me
              </div>
              <div className="card-body">
                <div style={{ fontWeight: 500, marginBottom: "10px" }}>
                  {this.state.user.length > 0
                    ? this.state.user[0].about
                    : "loading"}
                </div>

                <div>
                  {}
                  <button
                    className="btn btn-outline-warning btn-block"
                    aria-hidden="true"
                    style={{
                      marginTop: "20px",
                    }}
                    data-toggle="modal"
                    data-target="#modal"
                  >
                    EDIT
                  </button>
                  <div
                    className="modal fade"
                    id="modal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog bg-dark"
                      style={{ borderRadius: "10px" }}
                      role="document"
                      role="document"
                    >
                      <div
                        className="modal-content bg-dark"
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="modal-header" style={{ border: "0px" }}>
                          <h5 className="modal-title" id="exampleModalLabel">
                            About Me
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            style={{ color: "white" }}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => this.onChange2(e)}
                            defaultValue=""
                            placeholder="About yourself."
                          ></input>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={this.aboutEdit}
                            data-dismiss="modal"
                          >
                            EDIT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.isInSameClub)
      return (
        <div className="container row" style={{ marginTop: "100px" }}>
          <div className="col-9">
            {this.state.Posts.map((element) => {
              let target = "#Collapse" + element.postId;
              let heading = "heading" + element.postId;
              let downclass = "fa fa-angle-double-down";
              let upclass = "fa fa-angle-double-up";
              let event = element.isEvent;
              let cardclass =
                event === 0
                  ? "card text-white bg-dark"
                  : " card text-white bg-success";
              let finalclass = this.state.down === false ? upclass : downclass;
              let comment_counter = 1;

              return (
                <div
                  id="accordion"
                  key={element.postId}
                  style={{ marginBottom: "20px" }}
                >
                  <div className={cardclass}>
                    <div className="card-header" id={heading}>
                      <h5 className="mb-0">{element.title + " "}</h5>
                      <i
                        className={finalclass}
                        aria-hidden="true"
                        data-toggle="collapse"
                        data-target={target}
                        aria-expanded="true"
                        aria-controls={"Collapse" + element.postId}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: "10px",
                          bottom: "10px",
                        }}
                        onClick={
                          (this.changeDown,
                          () => this.givePostId(element.postId))
                        }
                      ></i>
                    </div>

                    <div
                      id={"Collapse" + element.postId}
                      className="collapse"
                      aria-labelledby={heading}
                      data-parent="#accordion"
                    >
                      <div
                      // className='card-body'
                      // dangerouslySetInnerHTML={{ __html: element.text }}
                      >
                        <MuiThemeProvider
                          theme={
                            element.isEvent == 0 ? defaultTheme : eventTheme
                          }
                          key={"muitheme" + element.postId}
                        >
                          <MUIRichTextEditor
                            defaultValue={this.convertToDraft(element.text)}
                            readOnly={true}
                            toolbar={false}
                            key={"mui" + element.postId}
                          />
                        </MuiThemeProvider>
                      </div>
                      <div>
                        <i
                          className="fa fa-comments"
                          aria-hidden="true"
                          style={{
                            marginLeft: "20px",
                            marginBottom: "10px",
                            cursor: "pointer",
                          }}
                          data-toggle="modal"
                          data-target={"#modal" + element.postId}
                        ></i>
                        <i
                          className="fa fa-flag"
                          aria-hidden="true"
                          style={{
                            marginLeft: "10px",
                            marginBottom: "10px",
                            cursor: "pointer",
                          }}
                          data-toggle="modal"
                          data-target={"#modal1" + element.postId}
                        ></i>
                        <i
                          className="fa fa-share-alt"
                          aria-hidden="true"
                          style={{
                            marginLeft: "10px",
                            marginBottom: "10px",
                            cursor: "pointer",
                          }}
                        ></i>

                        <div
                          className="modal fade "
                          id={"modal" + element.postId}
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog bg-dark"
                            style={{ borderRadius: "10px" }}
                            role="document"
                          >
                            <div
                              className="modal-content bg-dark"
                              style={{ borderRadius: "10px" }}
                            >
                              <div
                                className="modal-header"
                                style={{ border: "0px" }}
                              >
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  Comments
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  style={{ color: "white" }}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div
                                className="modal-body"
                                style={{
                                  maxHeight: "700px",
                                  scrollBehavior: "smooth",
                                  overflow: "auto",
                                }}
                              >
                                {this.state.Comments.map((comment) => {
                                  if (comment.postId === this.state.postId) {
                                    return (
                                      <div className="card bg-dark">
                                        <div className="card-body">
                                          <h5 className="card-title">
                                            {"#" + comment_counter++}
                                          </h5>
                                          <p className="card-text">
                                            {comment.text}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                              <div className="modal-footer">
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => this.onChange3(e)}
                                  defaultValue=""
                                  placeholder="Comment Here."
                                ></input>
                                <button
                                  type="button"
                                  className="btn btn-outline-success"
                                  onClick={this.postComment}
                                >
                                  Post Comment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="modal fade"
                          id={"modal1" + element.postId}
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog bg-dark"
                            style={{ borderRadius: "10px" }}
                            role="document"
                            role="document"
                          >
                            <div
                              className="modal-content bg-dark"
                              style={{ borderRadius: "10px" }}
                            >
                              <div
                                className="modal-header"
                                style={{ border: "0px" }}
                              >
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  Report
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  style={{ color: "white" }}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => this.onChange(e)}
                                  defaultValue=""
                                  placeholder="Please state your reason briefly."
                                ></input>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-outline-danger"
                                  data-dismiss="modal"
                                  onClick={() =>
                                    this.reportUser(
                                      element.authorId,
                                      element.postId
                                    )
                                  }
                                >
                                  Report User
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-3">
            <div className="card text-white bg-dark">
              <div
                className="card-header"
                style={{ textAlign: "center", fontWeight: "500" }}
              >
                About Me
              </div>
              <div className="card-body">
                <div style={{ fontWeight: 500, marginBottom: "10px" }}>
                  {/* 									{this.state.user[0].about}
                   */}{" "}
                </div>
                <div style={{ fontWeight: 300, marginBottom: "20px" }}>
                  {/* 									{this.state.Club[0].description}
                   */}{" "}
                </div>

                <div>
                  {}
                  <button
                    className="btn btn-primary btn-block"
                    aria-hidden="true"
                    style={{
                      marginTop: "20px",
                    }}
                    data-toggle="modal"
                    data-target="#modal"
                  >
                    MESSAGE
                  </button>
                  <div
                    className="modal fade"
                    id="modal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog bg-dark"
                      style={{ borderRadius: "10px" }}
                      role="document"
                      role="document"
                    >
                      <div
                        className="modal-content bg-dark"
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="modal-header" style={{ border: "0px" }}>
                          <h5 className="modal-title" id="exampleModalLabel">
                            Message
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            style={{ color: "white" }}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <input
                            type="text"
                            className="form-control"
                            /* onChange={(e) => this.onChange2(e)} */
                            defaultValue=""
                            placeholder="Message here."
                          ></input>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-outline-warning"
                            /* onClick={this.review_Club} */
                            data-dismiss="modal"
                          >
                            MESSAGE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div
          className="modal fade show d-block"
          id="ModalCenter"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.68)",
            backdropFilter: "blur(6px)",
          }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ borderRadius: "10px" }}
          >
            <div
              className="modal-content bg-dark"
              style={{ borderRadius: "10px" }}
            >
              <div className="modal-header" style={{ border: "0px" }}></div>
              <div className="modal-body">
                <h5
                  className="modal-title"
                  id="exampleModalLongTitle"
                  style={{ color: "white" }}
                >
                  You need to be in the same club with this user to see this
                  page
                </h5>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-warning"
                  onClick={this.goBack}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Content;
