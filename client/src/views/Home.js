import FitnessThree from "../assets/fitnessThree.jpg";
import FitnessFive from "../assets/fitnessFive.jpg";
import FitnessSix from "../assets/fitnessSix.jpg";

export default function Home() {
  return (
    <div className={"d-flex flex-column justify-content-center"}>
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
            Instructors can take attendance, request and process payments,
            create virtual “punch passes” for each type of class offered, alert
            clients of cancellations or location changes and so much more.
            Clients can easily find out information on classes - location, class
            size, start time and duration, as well as reschedule or cancel an
            upcoming appointment or reservation right from the mobile app.
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
              While you could use several mobile apps to accomplish this,
              AnywhereFitness is the all-in-one solution to meet your
              “on-location” fitness class needs. AnywhereFitness makes it
              painless for Instructors and Clients alike to hold and attend
              Fitness classes wherever they might be held.
            </h3>
          </div>
        </div>
      </div>
      <div className={"content-wrapperThree"}>
        <div className={"content"}>
          <h2>
            Instructors can take attendance, request and process payments,
            create virtual “punch passes” for each type of class offered, alert
            clients of cancellations or location changes and so much more.
            Clients can easily find out information on classes - location, class
            size, start time and duration, as well as reschedule or cancel an
            upcoming appointment or reservation right from the mobile app.
          </h2>
        </div>
      </div>
    </div>
  );
}
