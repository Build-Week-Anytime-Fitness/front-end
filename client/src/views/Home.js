import FitnessThree from "../assets/fitnessThree.jpg";
import FitnessFive from "../assets/fitnessFive.jpg";
import FitnessSix from "../assets/fitnessSix.jpg";
import FitnessEight from "../assets/fitnessEight.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className={"d-flex flex-column justify-content-center"}
      style={{ marginTop: "-10vh" }}
    >
      <div
        className={
          "d-flex flex-row flex-wrap justify-content-center fitness-wrapper"
        }
      >
        <div>
          <h1 className={"d-flex justify-content-center display-1"}>
            Welcome to Anywhere Fitness Club
          </h1>
          <h3>Find your path to achieving your personal fitness goals</h3>
        </div>
        <img
          className={"marketing-resizer"}
          src={FitnessThree}
          alt={"fitness Three"}
        />
      </div>
      <div className={"content-wrapperOne"}>
        <div className={"content"}>
          <h2>
            These days, fitness classes can be held anywhere- a park, an
            unfinished basement or a garage- not just at a traditional gym.
            Certified fitness instructors need an easy way to take the
            awkwardness out of attendance taking and client payment processing.
          </h2>
        </div>
      </div>
      <div
        className={
          "d-flex flex-row flex-wrap justify-content-center fitness-wrapper"
        }
      >
        <div className={"d-flex flex-row flex-wrap justify-content-center"}>
          <img
            className={"marketing-resizer"}
            src={FitnessFive}
            alt={"fitness Five"}
          />
          <div style={{ maxWidth: "50vw" }}>
            <h3>
              While you could use several mobile apps to accomplish this,
              AnywhereFitness is the all-in-one solution to meet your
              “on-location” fitness class needs. AnywhereFitness makes it
              painless for Instructors and Clients alike to hold and attend
              Fitness classes wherever they might be held.
            </h3>
          </div>
        </div>
      </div>
      <div className={"content-wrapperTwo"}>
        <div className={"content"}>
          <h2>
            With the ability to set locations at leisure your workouts can
            either be in set locations or randomly located places around town.
            Anywhere Fitness Club allows to you have a range of locale options
            for either attending or hosting fitness classes.
          </h2>
        </div>
      </div>
      <div
        className={
          "d-flex flex-row flex-wrap justify-content-center fitness-wrapper"
        }
      >
        <div className={"d-flex flex-column justify-content-center"}>
          <img
            className={"marketing-resizer"}
            src={FitnessSix}
            alt={"fitness six"}
            style={{ width: "50vw" }}
          />
          <div
            className={"content-two"}
            style={{
              maxWidth: "50vw",
              marginTop: "10vh",
              padding: "5vh 8vw",
              textAlign: "justify",
              backgroundColor: "#444",
            }}
          >
            <h3 style={{ color: "white" }}>
              In the days of COVID-19, finding a comfortable place to workout
              with a group can be nerve wracking. Smelly, sweaty gyms may not be
              your cup of green tea. With Anywhere Fitness Club, you can find
              popup fitness groups or schedule one-on-one time with a fitness
              instructor/ personal trainer and pick your location. <br />
              <br />
              Whether at the park, by the beach, or in a less confined space as
              fitness classes would normally take place in, Anywhere Fitness
              Club allows you to take control of your life again. <br />
              <br /> First, choose your desired workout. Next, decide on the
              duration of your class. Pick a start time that works for your
              schedule as well as a desired intensity level and get working with
              Anywhere Fitness Club.
            </h3>
          </div>
        </div>
      </div>
      <div className={"content-wrapperThree"}>
        <div className={"content"}>
          <h2>
            For for fitness instructors and personal trainers, Anywhere Fitness
            Club lets you reach your clientele easily and effectively. By
            allowing instructors to post their classes, take attendance, and
            request and process payments getting your business going is as easy
            as making a social media post. Need to reschedule, cancel or change
            a location because of inclement weather? Anywhere Fitness Club has
            you covered. Easily make and post changes to the board letting your
            clients know immediately with in the moment updating.
          </h2>
        </div>
      </div>
      <div
        className={
          "d-flex flex-row flex-wrap justify-content-center fitness-wrapper"
        }
      >
        <div className={"d-flex flex-column justify-content-center"}>
          <img
            className={"marketing-resizer"}
            src={FitnessEight}
            alt={"fitness eight"}
            style={{ width: "50vw" }}
          />
          <div
            style={{
              maxWidth: "50vw",
              margin: "10vh 0",
              padding: "5vh 8vw",
              textAlign: "justify",
              color: "black",
              
            }}
          >
            <h2
              style={{ color: "#222", textAlign: "center", fontSize: "2.5rem" }}
            >
              Find your comfort zone with Anywhere Fitness Club.{" "}
              <Link to="signup" style={{ marginBottom: "15vh", color: '#2522CA', textDecoration: 'none' }}>
                Signup {" "}
              </Link>
              or{" "}
              <Link to="login" style={{ marginBottom: "15vh", color: '#2522CA', textDecoration: 'none' }}>
                Login {" "}
              </Link>
              and start attaining your fitness goals today
            </h2>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
