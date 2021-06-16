"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = getUsers;
exports.register = register;
exports.login = login;
exports.getClubs = getClubs;
exports.createClub = createClub;
exports.createsubClub = createsubClub;
exports.getsubClubs = getsubClubs;
exports.postForgot = postForgot;
exports.editsubClub = editsubClub;
exports.deletesubClub = deletesubClub;

function getUsers() {
  var res, data;
  return regeneratorRuntime.async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("http://localhost:8080/api/users/"));

        case 2:
          res = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function register(user) {
  var res, data;
  return regeneratorRuntime.async(function register$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("/api/register/", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(user)
          }));

        case 2:
          res = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context2.sent;
          return _context2.abrupt("return", data);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function login(user) {
  var res, data;
  return regeneratorRuntime.async(function login$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch("/api/login/", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(user)
          }));

        case 2:
          res = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context3.sent;
          return _context3.abrupt("return", data);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getClubs() {
  var res, data;
  return regeneratorRuntime.async(function getClubs$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(fetch("/api/clubs/", {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify()
          }));

        case 2:
          res = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context4.sent;
          return _context4.abrupt("return", data);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function createClub(club) {
  var res, data;
  return regeneratorRuntime.async(function createClub$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(fetch("/api/addclub/", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(club)
          }));

        case 2:
          res = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context5.sent;
          return _context5.abrupt("return", data);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function createsubClub(club) {
  var res, data;
  return regeneratorRuntime.async(function createsubClub$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(fetch("/api/addsubclub/", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(club)
          }));

        case 2:
          res = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context6.sent;
          console.log(data);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function getsubClubs() {
  var res, data;
  return regeneratorRuntime.async(function getsubClubs$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(fetch("/api/subclubs/", {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify()
          }));

        case 2:
          res = _context7.sent;
          _context7.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context7.sent;
          return _context7.abrupt("return", data);

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function postForgot(email) {
  var res, data;
  return regeneratorRuntime.async(function postForgot$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(fetch("/api/passreset/", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(email)
          }));

        case 2:
          res = _context8.sent;
          _context8.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context8.sent;
          return _context8.abrupt("return", data);

        case 7:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function editsubClub(club) {
  var res, data;
  return regeneratorRuntime.async(function editsubClub$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(fetch("/api/updsubclubs/", {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(club)
          }));

        case 2:
          res = _context9.sent;
          _context9.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context9.sent;
          console.log(data);

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function deletesubClub(id) {
  var res, data;
  return regeneratorRuntime.async(function deletesubClub$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(fetch("/api/subclubs/delete/".concat(id), {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify()
          }));

        case 2:
          res = _context10.sent;
          _context10.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context10.sent;
          console.log(data);

        case 7:
        case "end":
          return _context10.stop();
      }
    }
  });
}