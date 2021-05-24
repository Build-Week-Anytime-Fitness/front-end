import React, { useEffect, useState } from 'react';
import Class from './Class.js';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { gsap } from "gsap";
import { connect } from "react-redux";
import { getData, searchTerm, getFilteredClasses, allClasses }  from "../../state/actions/index.js";



// const initialClassesValues = [
//     {
//         className: "Yoga On The Beach",
//         classType: "Yoga",
//         classDate: "2021/10/30",
//         startTime: "10:00am",
//         duration: 1, // hours
//         intensity: "low",
//         location: "Public Beach",
//         numberOfStudents: 8, 
//         maxClassSize: 10
//     },

//     ]


/* REDUX NOTE:
STATE NEEDED:  allClasses, filteredClasses, searchTerm
STATE CHANGERS NEEDED:  setAllClasses, setFilteredClasses, setSearchTerm
INITIAL STATE:  initialClassesValues (which gets assigned to setAllClasses and setFilteredClasses) 

NOTE:  Each changeHandler in this component will need to communicate with Redux because they all have state setters in them
*/

/* States for Classes.js & Search Functionality
const [ allClasses, setAllClasses ] = useState(initialClassesValues);
const [ filteredClasses, setFilteredClasses ] = useState(initialClassesValues);
const [ searchTerm, setSearchTerm ] = useState('');
*/

/*
PROPS (below)
allClasses, setAllClasses, filteredClasses, setFilteredClasses, setSearchTerm
*/

const Classes = (props) => {
    console.log("props", props);
    console.log("props.filteredClasses", props.filteredClasses)

    console.log("user from redux state", props.user)

  // ------------ populate class data with backend data------------------
//  function getAllClasses() {
//     axios.get('https://pt-fitness.herokuapp.com/classes')
//       .then(res => {

//         // console.log("All Classes ", res.data);
//         // console.log("Successful res back from Axios, res.data: ", res.data);

//         setAllClasses(res.data)
//         setFilteredClasses(res.data)

//       })
//       .catch(err => {
//         console.log("Error: ", err)
//         // history.push(`/error`)
//        alert("There was an error in loading classes.")
//        // debugger
//       })
//   } // populates classes state



  // ----------- Helper Function ---------------------
    // const getFilteredClasses = (searchTerm) => {
    // // edge case if searchTerm is "", reset filteredClasses to allClasses
    // if (searchTerm === "") {
    //     setFilteredClasses(allClasses);
    // }

    // // filter function over classes array
    // const filteredClasses = allClasses.filter( indivClass => {
    // // clean up search term, assign to searchText
    // const searchText = searchTerm.toLowerCase().trim();
    // const name = indivClass.className.toLowerCase();
    // const type = indivClass.classType.toLowerCase();
    // const time = indivClass.startTime.toLowerCase();
    // const intensity = indivClass.intensity.toLowerCase();
    // const location = indivClass.location.toLowerCase();
    
    // // check for match, create boolean
    // const matchesName = name.includes(searchText); 
    // const matchesType = type.includes(searchText);
    // const matchesDate = indivClass.classDate.includes(searchText);
    // const matchesTime = time.includes(searchText);
    // const matchesDuration = indivClass.intensity.includes(searchText);
    // const matchesIntensity = intensity.includes(searchText);
    // const matchesLocation = location.includes(searchText);
    
    // return matchesName || matchesType || matchesDate || matchesTime || matchesDuration || matchesIntensity || matchesLocation;
    
    // }); // end of filter
    // // console.log("getFilteredClasses is running");
    // // console.log("filteredClasses: ", filteredClasses);

    // setFilteredClasses(filteredClasses);

    // };

  // ----------- Helper Function ---------------------}
    // const searchChangeHandler = (e) => {
    // // NOT the same variable as searchTerm in App.js
    // const searchTerm = e.target.value;
    // setSearchTerm(searchTerm); // readable option
    // // setSearchTerm({searchTerm: e.target.value}); // cleaner option
    // // console.log("The changeHandler is running.")
    // getFilteredClasses(searchTerm);
    // };

  // -------------------- Side Effects -----------------
//   useEffect(() => {
//     axios.get('https://pt-fitness.herokuapp.com/classes')
//       .then(res => {
 
        // console.log("All Classes ", res.data);
        // console.log("Successful res back from Axios, res.data: ", res.data);

//         setAllClasses(res.data)
//         setFilteredClasses(res.data)

//       })
//       .catch(err => {
//         console.log("Error: ", err)
//         // history.push(`/error`)
//        alert("There was an error in loading classes.")
//        // debugger
//       })
//   }, [setAllClasses, setFilteredClasses]); // populates allClasses on browser reload

    useEffect(() => {
    gsap.to(".animation", {duration: 2, y: 30});
    }, []); // gsap animation to slide cards down slightly upon load

return (
    <>

    <div className='classes-background'>
        <div className='classes-content-container'>    

            <div className='d-flex flex-row flex-wrap'>          
                <h1>Classes</h1>        

                <SearchIcon className='search-icon' style={{ color: '444444', marginTop: '2vh'}} fontSize="large"/>

                <input
                placeholder="Search for classes"
                type="text"
                // onChange={searchChangeHandler}
                style={{
                    width: '12vw',
                    height: '2rem',
                    marginTop: '2vh'
                }}
                />

            </div>
        
            <div className="classes-container d-flex flex-row flex-wrap justify-content-center class-box">

                <div className="animation d-flex flex-row flex-wrap justify-content-center ">
                {props.classes && 
                props.classes.map(indivClass => {
                    // console.log("indivClass: ", indivClass)
                    const classKey = Math.random().toString(16).slice(2);
                    return <Class key={classKey} indivClass={indivClass} />
                })
                }
                </div>

            </div>

        </div>
    </div>

    </>
    )
}

const mapStateToProps = (state) => {
    return {
        classes: state.classes,
        filteredClasses: state.filteredClasses,
        isLoading: state.isLoading,
        user: state.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getData: dispatch(getData()),
        getFilteredClasses: dispatch(getFilteredClasses()),
        allClasses: dispatch(allClasses()),
        searchTerm: dispatch(searchTerm()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes);

