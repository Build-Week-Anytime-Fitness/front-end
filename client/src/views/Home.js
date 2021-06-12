import React from 'react'
import FitnessThree from "../assets/fitnessThree.jpg";
import FitnessFive from "../assets/fitnessFive.jpg";
import FitnessSix from "../assets/fitnessSix.jpg";
import FitnessEight from "../assets/fitnessEight.jpg";
import FitnessNine from "../assets/fitnessNine.jpg";
import {Link} from "react-router-dom";
import Video from "../assets/fitness.mp4"
import ReactPlayer from "react-player";

export default function Home() {


    return (
        <React.Fragment>
            <ReactPlayer
                url={Video}
                playing={true}
                loop={true}
                width={'100vw'}
                height={'120vh'}
                style={{marginTop: '5vh'}}
                id={'video-player'}
                playsinline={true}
            />

            <div className={"regular-wrapper"} >
                <div className={"content1"}>
                    <h1 className={"d-flex justify-content-center"} style={{color: 'white', fontSize: '5rem'}}>
                        Welcome to Anywhere Fitness Club
                    </h1>
                    <h3 style={{fontSize: '1.75rem'}}>Find your path to achieving your personal fitness goals</h3>
                    <img
                        className={"marketing-resizer"}
                        src={FitnessThree}
                        alt={"fitness Three"}
                        style={{marginTop: '5vh'}}
                    />
                </div>
            </div>
            <div className={"parallax-wrapper"}>
                <div className={"content d-flex justify-content-center"}>
                    <div className={'d-flex justify-content-center'} style={{width: '450px', padding: '10vh 5vw'}}>
                        <h2>
                            These days, fitness classes can be held anywhere. A park, an
                            unfinished basement or a garage can become a place to post your gains. Not just at a
                            traditional gym.
                            Certified fitness instructors need an easy way to take the
                            awkwardness out of attendance taking and client payment processing.
                        </h2>
                    </div>

                </div>
            </div>
            <div className={"regular-wrapper2 d-flex align-items-center"}>
                <div className={"content d-flex justify-content-center"}>
                    <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                        <img
                            className={"marketing-resizer"}
                            src={FitnessFive}
                            alt={"fitness Five"}
                        />
                        <div style={{maxWidth: "50vw", margin: '10vh'}}>
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
            </div>
            <div className={"regular-wrapper2 d-flex flex-column justify-content-start align-items-center"}
                 style={{marginTop: '-20vh'}}>
                <img
                    src={FitnessNine}
                    alt={"fitness Five"}
                    style={{
                        width: '450px',
                        height: '650px',
                        boxShadow: '0 0 8rem #444'
                    }}

                />
                <div style={{textAlign: 'center', width: '400px', marginTop: '8vh', padding: '5vw'}}>
                    <h2>
                        With the ability to set locations at leisure your workouts can
                        either be in set locations or randomly located places around town.
                        Anywhere Fitness Club allows to you have a range of locale options
                        for either attending or hosting fitness classes.
                    </h2>
                </div>


            </div>
            <div className={"parallax-wrapper2"} style={{height: '120vh'}}>
                <div className={"content"} style={{width: '80%', padding: '5vw',}}>

                    <h3 style={{color: "white"}}>
                        In the days of COVID-19, finding a comfortable place to workout
                        with a group can be nerve wracking. <br/>Smelly, sweaty gyms may not be
                        your cup of green tea. With Anywhere Fitness Club, you can find
                        popup fitness groups or schedule one-on-one time with a fitness
                        instructor/ personal trainer and pick your location. <br/>
                        <br/>
                        Whether at the park, by the beach, or in a less confined space as
                        fitness classes would normally take place in, Anywhere Fitness
                        Club allows you to take control of your life again. First, choose your desired workout. Next,
                        decide on the
                        duration of your class. Pick a start time that works for your
                        schedule as well as a desired intensity level and get working with
                        Anywhere Fitness Club.
                    </h3>

                </div>
            </div>
            <div className={"regular-wrapper2"}>
                <div className={"content d-flex flex-column justify-content-center align-items-center"}>
                    <div style={{width: '400px', padding: '10vh 0'}}>
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
                    <img
                        className={"marketing-resizer"}
                        src={FitnessSix}
                        alt={"fitness six"}
                        style={{width: "400px"}}
                    />
                </div>
            </div>
            <div className={"parallax-wrapper4"}>

            </div>
            <div className={"regular-wrapper3"}>
                <div className={"content"} style={{opacity: '0.95'}}>
                    <img
                    className={"marketing-resizer"}
                    src={FitnessEight}
                    alt={"fitness eight"}
                    style={{ width: "400px" }}
                />
                    <h2
                        style={{color: "white", textAlign: "center", fontSize: "2.5rem", padding: '20vh 0'}}
                    >
                        Find your comfort zone with Anywhere Fitness Club.{" "}<br/>
                        <Link to="signup" style={{marginBottom: "15vh", color: '#2522CA', textDecoration: 'none'}}>
                            Signup {" "}
                        </Link>
                        or{" "}
                        <Link to="login" style={{marginBottom: "15vh", color: '#2522CA', textDecoration: 'none'}}>
                            Login {" "}
                        </Link>
                        and start attaining your fitness goals today
                    </h2>
                </div>
            </div>
        </React.Fragment>
    )
}



