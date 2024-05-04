import { useState } from "react";
import Dropdown from "react-select";
import { users, listY, list } from "./constant";
import "./styles.css";
import "./hamburger.css";
import "./login.css";
import "./footer.css";
import "./myaccount.css";

const user = JSON.parse(localStorage.getItem("user"));
let loggedIn = user?.username || false;

const urlDefault =
  "https://www.booking.com/searchresults.en-gb.html?checkout_monthday=24&checkout_year_month=2023-03&checkin_monthday=17&sid=as&aid=389963&checkin_year_month=2023-03&dest_id=-2114250&group_children=0&si=ci&group_adults=2&label=klarnatrips-stid-89ee0991-cbe5-4f1c-b7e7-c9052785eea3-lang-en-src-wtshotelsdesktop1of1-clkdt-20230312-exp0&dest_type=city&no_rooms=1";

let loggedInUser = user?.username;

export default function App() {
  const [showNav, setShowNav] = useState(false);
  const [planner, setPlanner] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [page, setPage] = useState("/");
  const [searchOption, setSearchOption] = useState("day-by-day");

  return (
    <div className="App">
      <Nav showNav={showNav} setShowNav={setShowNav} setPage={setPage} />
      {page === "/" && (
        <main>
          <header>
            <h1 className="header1">The new way to plan your next trip</h1>
            <h3 className="header2">Your day-by-day itinerary at one place</h3>
          </header>
          {!planner && (
            <div className="startPlanningBtn">
              <button
                className=""
                onClick={() => {
                  if (loggedInUser) {
                    setPlanner(true);
                  } else {
                    setPage("/login");
                  }
                }}
              >
                Start planning
              </button>
            </div>
          )}
          {planner && (
            <div className="planner">
              <button
                className="closePlannerBtn"
                onClick={() => setPlanner(false)}
              >
                X
              </button>
              <p className="plannerTitle">Itinerary Planner</p>
              <div className="destinationDropdown">
                <Dropdown
                  options={list}
                  placeholder={selectedDestination || "ENTER YOUR DESTINATION"}
                  value={selectedDestination}
                  onChange={(v) => {
                    setSelectedDestination(v.value);
                  }}
                />
              </div>
              <button onClick={() => selectedDestination && setPage("/search")}>
                See your trip
              </button>
            </div>
          )}
        </main>
      )}
      {page === "/search" && (
        <Search
          searchOption={searchOption}
          setSearchOption={setSearchOption}
          selectedDestination={selectedDestination}
        />
      )}
      {page === "/login" && <Login setPage={setPage} />}
      {page === "/signup" && <SignUp setPage={setPage} />}
      {page === "/myaccount" && <MyAccount setPage={setPage} />}
      {page === "/about" && <About setPage={setPage} />}
      <Footer />
    </div>
  );
}

const Nav = ({ showNav, setShowNav, setPage }) => {
  return (
    <nav>
      <div className="hamburger-container">
        <div className="hamburger">
          <input
            type="checkbox"
            className="hamburger-input"
            checked={showNav}
            onChange={(e) => setShowNav(e.target.checked)}
          />
          <span className={showNav ? "first" : ""}></span>
          <span className={showNav ? "second" : ""}></span>
          <span className={showNav ? "third" : ""}></span>
        </div>
      </div>
      <ul className={`navMenu ${showNav ? "showNav" : ""}`}>
        <a href="/#" onClick={() => setPage("/")}>
          <li>Home</li>
        </a>
        {loggedIn && (
          <a href="/#" onClick={() => setPage("/myaccount")}>
            <li>My account</li>
          </a>
        )}
        <a href="/#" onClick={() => setPage("/about")}>
          <li>About us</li>
        </a>
        <a href="/#">
          <li>Contact us</li>
        </a>
        <div className="feedbackbutton">
          <button
            type="button"
            class="btn btn-info btn-lg Feedback"
            data-toggle="Feedback"
            data-target="#myFeedback"
          >
            Feedback
          </button>
        </div>
      </ul>

      <div className="logo">Trip Planner</div>
      {loggedIn ? (
        <div className="authBtnContainer">
          <div className="userFirstLetter">{users[loggedIn]?.name[0]}</div>
        </div>
      ) : (
        <div className="authBtnContainer">
          <button className="loginBtn" onClick={() => setPage("/login")}>
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

const searchDefProp = {
  selectedDestination: "VASAI",
};

const Search = ({
  searchOption,
  setSearchOption,
  selectedDestination,
} = searchDefProp) => {
  const { famousPlace, restaurants, img, url } = listY.filter(
    (item) => item.destination === selectedDestination
  )[0];

  console.table(listY);

  if (!famousPlace) return "Error!!!!!!!";

  return (
    <main className="searchSection">
      <div className="searchTabs">
        <div
          className={`searchTab ${
            searchOption === "day-by-day" ? "searchTabActive" : ""
          }`}
          onClick={() => setSearchOption("day-by-day")}
        >
          Day by day
        </div>
        <div
          className={`searchTab ${
            searchOption === "hotels" ? "searchTabActive" : ""
          }`}
          onClick={() => setSearchOption("hotels")}
        >
          Hotels
        </div>
        <div
          className={`searchTab ${
            searchOption === "restaurants" ? "searchTabActive" : ""
          }`}
          onClick={() => setSearchOption("restaurants")}
        >
          Restaurants
        </div>
      </div>
      {searchOption === "day-by-day" && (
        <div
          className="dayByDay"
          style={{ overflowY: "scroll", minHeight: "500px" }}
        >
          <div
            className="station"
            style={{ fontSize: "20px", fontWeight: 900 }}
          >
            {selectedDestination}
          </div>
          {famousPlace.map((place, id) => (
            <>
              <div>
                <div className="line" />
                <div className="searchIcons">
                  <div>
                    <div className="searchIconImg">
                      <img
                        src="https://maps.gstatic.com/consumer/images/icons/2x/directions_car_grey800_24dp.png"
                        alt=""
                      />
                    </div>
                    <div>{place.car.time}</div>
                    <div>{place.car.distance}</div>
                  </div>
                  <div>
                    <div className="searchIconImg">
                      <img src="/icons/motorcycle.png" alt="" style={{}} />
                    </div>
                    <div>{place.bike.time}</div>
                    <div>{place.bike.distance}</div>
                  </div>
                  <div>
                    <div className="searchIconImg">
                      <img
                        src="https://maps.gstatic.com/consumer/images/icons/2x/directions_walk_grey800_24dp.png"
                        alt=""
                      />
                    </div>
                    <div>{place.walking.time}</div>
                    <div>{place.walking.distance}</div>
                  </div>
                </div>
                <div className="line" />
              </div>

              <div className="searchCard">
                <div className="cardDetailsSection">
                  <img
                    src={place.img}
                    alt=""
                    className="cardDestinationImg"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="cardDestination">
                    <div className="cardName" style={{ fontWeight: "bold" }}>
                      {place.name}
                    </div>
                    <div className="cardDetails">
                      <span>{place.rating || 4.3} rating</span> -{" "}
                      <span>Landmark</span> -{" "}
                      <span>{place.spot || "Tourist Spot"}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "25px",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        className="searchIconImg searchIcons"
                        onClick={() =>
                          place.location &&
                          window.open(place.location, "_blank").focus()
                        }
                      >
                        <img src="/icons/location-icon.png" alt="Location" />
                      </div>
                      <div
                        className="searchIconImg searchIcons"
                        onClick={() =>
                          place.about &&
                          window.open(place.about, "_blank").focus()
                        }
                      >
                        <img
                          src="/icons/open-new-tab.png"
                          alt="Open in new tab"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* {id !== famousPlace.length - 1 && (
              )} */}
            </>
          ))}
        </div>
      )}
      {searchOption === "hotels" && (
        <div>
          <h2>Where to stay in {selectedDestination}</h2>
          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <img
                style={{
                  height: "400px",
                  width: "400px",
                  objectFit: "cover",
                }}
                src={
                  img ||
                  "https://images.unsplash.com/photo-1678891774474-4c7a1eb40001?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                }
                alt=""
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "90px",
              }}
            >
              <p>
                Browse hotels, guesthouse, and unique homes and book your stay
                on the world's leading accomodation sites
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <div style={{ fontSize: "24px" }}>
                  <span style={{ color: "blue" }}>Booking</span>
                  <span style={{ color: "dodgerblue" }}>.com</span>
                </div>
                <div>20 million rooms at your fingertips</div>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ borderRadius: "100px", padding: "10px 30px" }}
                  onClick={() =>
                    window.open(url || urlDefault, "_blank").focus()
                  }
                >
                  Find hotels
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {searchOption === "restaurants" && (
        <div
          className="dayByDay"
          style={{ overflowY: "scroll", minHeight: "500px" }}
        >
          <div
            className="station"
            style={{ fontSize: "20px", fontWeight: 900 }}
          >
            {selectedDestination}
          </div>
          {restaurants.map((place, id) => (
            <>
              <div>
                <div className="line" />
                <div className="searchIcons">
                  <div>
                    <div className="searchIconImg">
                      <img
                        src="https://maps.gstatic.com/consumer/images/icons/2x/directions_car_grey800_24dp.png"
                        alt=""
                      />
                    </div>
                    <div>{place.car.time}</div>
                    <div>{place.car.distance}</div>
                  </div>
                  <div>
                    <div className="searchIconImg">
                      <img src="/icons/motorcycle.png" alt="" style={{}} />
                    </div>
                    <div>{place.bike.time}</div>
                    <div>{place.bike.distance}</div>
                  </div>
                  <div>
                    <div className="searchIconImg">
                      <img
                        src="https://maps.gstatic.com/consumer/images/icons/2x/directions_walk_grey800_24dp.png"
                        alt=""
                      />
                    </div>
                    <div>{place.walking.time}</div>
                    <div>{place.walking.distance}</div>
                  </div>
                </div>
                <div className="line" />
              </div>
              <div className="searchCard">
                <div className="cardDetailsSection">
                  <img
                    src={place.img}
                    alt=""
                    className="cardDestinationImg"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="cardDestination">
                    <div className="cardName">{place.name}</div>
                    <div className="cardDetails">
                      <span>{place.rating || 4.3} rating</span> -{" "}
                      <span>Landmark</span> -{" "}
                      <span>{place.spot || "Tourist Spot"}</span>
                      <div
                        style={{
                          display: "flex",
                          gap: "25px",
                          marginTop: "20px",
                        }}
                      >
                        <div
                          className="searchIconImg searchIcons"
                          onClick={() =>
                            place.location &&
                            window.open(place.location, "_blank").focus()
                          }
                        >
                          <img src="/icons/location-icon.png" alt="Location" />
                        </div>
                        <div
                          className="searchIconImg searchIcons"
                          onClick={() =>
                            place.about &&
                            window.open(place.about, "_blank").focus()
                          }
                        >
                          <img src="/icons/restaurant.png" alt="Restaurant" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </main>
  );
};

const Login = ({ setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = users[username] && users[username].password === password;
    if (login) {
      loggedInUser = username;
      alert("Signed in successfully");
      loggedIn = username;
      setPage("/");
      const json = JSON.stringify({ username, password });
      localStorage.setItem("user", json);
    } else alert("wrong username or password");
  };
  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <h3>Please enter your login and password!</h3>
        <div>
          <input
            type="text"
            id="username"
            placeholder="EMAIL"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">LOGIN</button>
        </div>
        <p>
          Don't have an account?
          <span onClick={() => setPage("/signup")}> Sign Up</span>
        </p>
      </form>
    </div>
  );
};

const SignUp = ({ setPage }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users[username]) {
      alert("user already exists");
      return;
    }
    users[username] = {
      password,
      name,
    };
    alert("Account created");
    setPage("/login");
  };
  let matchString;
  if (password && rePassword) {
    if (password === rePassword) {
      matchString = "Password match";
    } else {
      matchString = "Passwords dont match";
    }
  }

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <h1>SIGNUP</h1>
        <h3 style={{ marginBottom: 0 }}>Create an account!</h3>
        <div>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="EMAIL"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="PASSWORD"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {password && (
          <div>
            <label htmlFor="rePassword">Password</label>
            <input
              type="password"
              id="rePassword"
              placeholder="please enter password again"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
        )}
        {matchString}
        <div>
          <button type="submit" disabled={!password === rePassword}>
            SIGNUP
          </button>
        </div>
        <p>
          Already have an account?{" "}
          <span onClick={() => setPage("/login")}>Login!</span>
        </p>
      </form>
    </div>
  );
};

const MyAccount = ({ setPage }) => {
  const { password, name } = users[loggedInUser] || { password: "", name: "" };
  console.log(name);
  return loggedIn ? (
    <div className="myaccount">
      <div className="userFirstLetter">{name[0]}</div>
      <div className="myaccountName">{name}</div>
      <div className="myaccountUsername">{loggedInUser}</div>
      <div className="myaccountPassword">{"*".repeat(password.length)}</div>
      <div>
        <button
          type="button"
          class="btn btn-dark"
          onClick={() => {
            loggedIn = false;
            loggedInUser = false;
            setPage("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  ) : null;
};

const Footer = () => {
  return (
    <footer>
      <div class="container-fluid pb-0 mb-0 justify-content-center text-light ">
        <footer>
          <div class="row my-5 justify-content-center py-5">
            <div class="col-11">
              <div class="row ">
                <div class="col-xl-8 col-md-4 col-sm-4 col-12   my-auto mx-auto a">
                  <h3 class="text-muted mb-md-0 mb-5 bold-text">TRIPPLANNER</h3>
                </div>
                <div class="col-xl-2 col-md-4 col-sm-4 col-12">
                  <h6 class="mb-3 mb-lg-4 bold-text ">
                    <b>MENU</b>
                  </h6>
                  <ul class="list-unstyled">
                    <li>Home</li>
                    <li>About</li>
                    <li>Blog</li>
                    <li>Portfolio</li>
                  </ul>
                </div>
                <div class="col-xl-2 col-md-4 col-sm-4 col-12">
                  <h6 class="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5">
                    <b>{/*  */}</b>
                  </h6>
                  <p class="mb-1">College Project</p>{" "}
                </div>
              </div>
              <div class="row ">
                <div class="col-xl-8 col-md-4 col-sm-4 col-auto  my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                  <p class="social text-muted mb-0 pb-0 bold-text">
                    {" "}
                    <span class="mx-2">
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </span>{" "}
                    <span class="mx-2">
                      <i class="fa fa-linkedin-square" aria-hidden="true"></i>
                    </span>{" "}
                    <span class="mx-2">
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </span>{" "}
                    <span class="mx-2">
                      <i class="fa fa-instagram" aria-hidden="true"></i>
                    </span>{" "}
                  </p>
                  <small class="rights">
                    <span>&#174;</span> TRIPPLANNER All Rights Reserved.
                  </small>
                </div>
                <div class="col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end ">
                  <h6 class="mt-55 mt-2 text-muted bold-text">
                    <b>Kartik Dubey</b>
                  </h6>
                  <small>
                    {" "}
                    <span>
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                    </span>{" "}
                    kartikvikasdubey@gmail.com
                  </small>
                  <h6 class="mt-55 mt-2 text-muted bold-text">
                    <b>Avinash kharwar</b>
                  </h6>
                  <small>
                    {" "}
                    <span>
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                    </span>{" "}
                    avinashkharwar@gmail.com
                  </small>
                </div>
                <div class="col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end ">
                  <h6 class="mt-55 mt-2 text-muted bold-text">
                    <b>Amit Mishra</b>
                  </h6>
                  <small>
                    {" "}
                    <span>
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                    </span>{" "}
                    amitmishra@gmail.com
                  </small>
                  <h6 class="mt-55 mt-2 text-muted bold-text">
                    <b>Vedant halale</b>
                  </h6>
                  <small>
                    {" "}
                    <span>
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                    </span>{" "}
                    vedanthalalegmail.com
                  </small>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* *Made by Kartik Dubey. Avinash Kharwar. Shriram Nalge. Pratham Mistry */}
    </footer>
  );
};

const About = () => (
  <div
    style={{
      padding: "50px 0",
      maxWidth: "50vw",
      margin: "0 auto",
      minWidth: "300px",
    }}
  >
    <h1>About Us</h1>
    <p>
      The hardest part of planning a trip is always choosing the right pla for
      exploring the famous spots. We were also facing the same problem at start,
      that's "why are made this website. A simple search on our website will
      help you and to search famous destinations travel sites in reconds. Wild
      dro We plan the trip the according olquirements of customer. the The main
      objective of planner website is to our trip g 'give provide "the best
      service to customers.
    </p>
  </div>
);
