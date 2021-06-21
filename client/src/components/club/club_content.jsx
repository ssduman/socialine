import React, { Component } from "react";
import {
  getPosts,
  getsubClub,
  getUserMembership,
  addUserMembership,
  addComment,
  getComments,
  addReport,
  rateClub,
  reviewClub,
  getMembers,
  addAdminRequest,
  getReports,
  deleteReport,
  banUser,
} from "../api/apiCall.js";
import PostDraft from "../util/PostDraft";
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

class ClubContent extends Component {
  state = {
    Posts: [],
    down: true,
    Club: [{ rating: 0 }],
    isMember: 1,
    comment: "",
    postId: "",
    Comments: [],
    report: "",
    point: 0,
    review: "",
    canRate: false,
    members: [],
    isAdminofclub: false,
    reports: [],
    banned: 0,
  };

  componentDidMount() {
    getPosts(this.props.match.params.clubID).then((response) => {
      let list = response.reverse();
      this.setState({ Posts: list });
    });
    getsubClub(this.props.match.params.clubID).then((response) => {
      this.setState({ Club: response });
    });
    getUserMembership(this.props.userId).then((response) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].subClub === parseInt(this.props.match.params.clubID)) {
          if (response[i].isAdmin === 1) {
            let reports = [];
            getReports().then((response2) => {
              for (let k = 0; k < response2.length; k++) {
                for (let f = 0; f < this.state.Posts.length; f++) {
                  if (
                    this.state.Posts[f].postId ===
                    parseInt(response2[k].targetPost)
                  ) {
                    reports.push(response2[k]);
                  }
                }
              }
              this.setState({ reports });
            });
            this.setState({ isAdminofclub: true });
          }
          break;
        } else if (i + 1 === response.length) this.setState({ isMember: 0 });
      }
      if (response.length < 1) this.setState({ isMember: 0 });
    });
    getComments().then((response) => {
      this.setState({ Comments: response });
    });
    getMembers(this.props.match.params.clubID).then((response) => {
      this.setState({ members: response });
      for (let i = 0; i < response.length; i++) {
        if (
          parseInt(this.props.userId) === response[i].user &&
          response[i].isBanned === 1
        ) {
          this.setState({ banned: 1 });
          break;
        }
      }
    });
  }

  changeDown = () => {
    if (this.state.down === true) this.setState({ down: false });
    else this.setState({ down: true });
  };

  joinClub = () => {
    var user = {
      user: parseInt(this.props.userId),
      club: parseInt(this.state.Club[0].parentId),
      subClub: parseInt(this.props.match.params.clubID),
      isAdmin: 0,
      userPointToSubClub: 40,
      isBanned: 0,
    };
    addUserMembership(user).then((response) => {
      document.location.reload();
    });
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
  onChange1 = (data) => {
    this.setState({
      point: data.target.value,
    });
  };
  onChange2 = (data) => {
    this.setState({
      review: data.target.value,
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

  rate_Club = () => {
    let rate = {
      user: parseInt(this.props.userId),
      club: parseInt(this.state.Club[0].parentId),
      subClub: this.props.match.params.clubID,
      userPointToSubClub: this.state.point,
    };
    rateClub(rate);
  };

  review_Club = () => {
    let review = {
      user: parseInt(this.props.userId),
      club: parseInt(this.state.Club[0].parentId),
      subClub: this.props.match.params.clubID,
      review: this.state.review,
    };
    reviewClub(review);
  };

  canRate_change = () => {
    this.setState({
      canRate: true,
    });
  };

  doubleCall = () => {
    this.rate_Club();
    this.canRate_change();
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

  requestAdmin = () => {
    let user = {
      userId: parseInt(this.props.userId),
      clubId: parseInt(this.state.Club[0].parentId),
      subClubId: this.props.match.params.clubID,
      reason: "User #" + this.props.userId + " wants to be admin.",
    };

    addAdminRequest(user).then((response) => {});
  };

  delete_Report = (id) => {
    let reports = this.state.reports;
    for (let i = 0; i < reports.length; i++) {
      if (reports[i].id === id) {
        reports.splice(i, 1);
      }
    }
    this.setState(reports);
    deleteReport(id);
  };

  ban_User = (user, reason, id) => {
    let ban = {
      user: user,
      club: parseInt(this.state.Club[0].parentId),
      subClub: this.props.match.params.clubID,
      banDuration: 5,
      banReason: reason,
    };
    this.delete_Report(id);
    banUser(ban);
  };

  render() {
    if (this.state.banned)
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
                  You are banned from this club.{" "}
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
    else if (this.state.isMember)
      return (
        <div className="container row" style={{ marginTop: "100px" }}>
          <div className="col-9">
            <div className="mb-2">
              <PostDraft
                subClubId={this.state.Club[0].subClubId}
                userId={this.props.userId}
              ></PostDraft>
            </div>
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
                      <h5 className="mb-0">
                        {element.title + " #" + element.postId}
                      </h5>
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
                About Club
              </div>
              <div className="card-body">
                <div style={{ fontWeight: 500, marginBottom: "10px" }}>
                  Description
                </div>
                <div style={{ fontWeight: 300, marginBottom: "20px" }}>
                  {this.state.Club[0].description}
                </div>
                <div style={{ fontWeight: 500, marginBottom: "20px" }}>
                  Rating
                </div>

                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: this.state.Club[0].rating + "%",
                      fontWeight: 500,
                    }}
                    aria-valuenow={this.state.Club[0].rating}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {this.state.Club[0].rating}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 500,
                      marginBottom: "20px",
                      marginTop: "20px",
                    }}
                  >
                    Rate Club!
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="100"
                    step="10"
                    id="customRange3"
                    style={{ width: "100%", marginBottom: "10px" }}
                    onChange={(e) => this.onChange1(e)}
                  />
                  <button
                    className="btn btn-block btn-outline-info"
                    onClick={this.doubleCall}
                    disabled={this.state.canRate}
                  >
                    RATE
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-outline-warning btn-block"
                    aria-hidden="true"
                    style={{
                      marginTop: "20px",
                    }}
                    data-toggle="modal"
                    data-target="#modal"
                  >
                    REVIEW
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
                            Review
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
                            placeholder="Please state your review briefly."
                          ></input>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={this.review_Club}
                            data-dismiss="modal"
                          >
                            REVIEW
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    className="btn btn-outline-primary btn-block btn-sm"
                    aria-hidden="true"
                    style={{
                      marginTop: "20px",
                    }}
                    data-toggle="modal"
                    data-target="#modalforreports"
                  >
                    VIEW MEMBERS
                  </button>
                  <div
                    className="modal fade"
                    id="modalforreports"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ModalLabel"
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
                        <div className="modal-header" style={{ border: "0px" }}>
                          <h5 className="modal-title" id="exampleModalLabel">
                            Members
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
                          {this.state.members.map((member) => {
                            return (
                              <div>
                                <a>{member.userName}</a>
                                <a>Message User</a>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {this.state.isAdminofclub ? (
                  <div>
                    <button
                      className="btn btn-sm btn-outline-danger btn-block"
                      aria-hidden="true"
                      style={{
                        marginTop: "20px",
                      }}
                      data-toggle="modal"
                      data-target="#modalformembers"
                    >
                      REPORTS
                    </button>
                    <div
                      className="modal fade"
                      id="modalformembers"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ModalLabel"
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
                            <h5 className="modal-title" id="exampleModalLabel">
                              Reports
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
                            {this.state.reports.map((report) => {
                              return (
                                <div className="card text-white bg-danger mb-3">
                                  <div className="card-header">
                                    <h5>
                                      Report for Post #{report.targetPost}
                                    </h5>
                                  </div>
                                  <div className="card-body">
                                    <div>
                                      <a href={"/user/" + report.reporterId}>
                                        Reporting User
                                      </a>
                                    </div>
                                    Reason: {report.reason}
                                    <div>
                                      <button
                                        className="btn btn-primary mr-3 mt-3"
                                        onClick={() =>
                                          this.ban_User(
                                            report.targetId,
                                            report.reason,
                                            report.id
                                          )
                                        }
                                      >
                                        Ban User
                                      </button>
                                      <button
                                        className="btn btn-primary mt-3"
                                        onClick={() =>
                                          this.delete_Report(report.id)
                                        }
                                      >
                                        Delete Report
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-sm btn-outline-danger btn-block"
                      aria-hidden="true"
                      style={{
                        marginTop: "20px",
                      }}
                      data-toggle="modal"
                      data-target="#modalforrequests"
                      onClick={this.requestAdmin}
                    >
                      Be an Admin
                    </button>
                    <div
                      className="modal fade"
                      id="modalforrequests"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ModalLabel"
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
                            <h5 className="modal-title" id="exampleModalLabel">
                              Your request has successfully reached to us.
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
                            Please wait for sub-club admin to approve your
                            request
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                  You need to join this club to be able to see content
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.joinClub}
                >
                  Join Club
                </button>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ClubContent;
