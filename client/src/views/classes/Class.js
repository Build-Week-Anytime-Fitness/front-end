import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch } from "react-redux";
import { connectToStore } from "../../state/interfaces/classInterface";
import {
  classToEdit,
  setEditMode,
} from "../../state/actions";

const useStyles = makeStyles({
  root: {
    minWidth: 310,
    backgroundColor: '#DDD',
    fontSize: 22,
    margin: "20px",
    boxShadow: "0 0 1rem #444",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "25px",
    padding: "3vh 3vw",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 12,
    fontSize: 22,
    color: "#0077be",
  },
}); // material UI styles

const Class = (props) => {
  const dispatch = useDispatch();
  //const localId = localStorage.getItem("id")
  // console.log("sanity localId", Number(localId));
  // console.log(
  //   "sanity check props.indivClass.instructor_id",
  //   props.indivClass.instructor_id
  // );
  //const editing = useSelector((state) => state.editing);
  const editForm = {
    id: props.indivClass.id,
    class_name: props.indivClass.class_name,
    class_type: props.indivClass.class_type,
    class_date: props.indivClass.class_date,
    start_time: props.indivClass.start_time,
    duration: props.indivClass.duration, // hours
    intensity: props.indivClass.intensity,
    location: props.indivClass.location,
    number_of_students: props.indivClass.number_of_students,
    max_class_size: props.indivClass.max_class_size,
  };

  let { indivClass } = props;
  // Determines location from useLocation(), if "/instructors" is found, set isInstructor to true, trigger positive conditional render in card
  let { pathname } = useLocation();
  // console.log("pathname from Class: ", pathname); // gets the location, looking for "/instructors", A STRING
  let isInstructor = false;
  if (pathname === "/instructors") {
    isInstructor = true;
  }

  const { max_class_size, number_of_students } = indivClass;

  // material UI code
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  // --------------  Helper Functions ----------------
  const handleEditButtonClick = () => {
    dispatch(setEditMode(true));
    //console.log("handleEditButtonClick has been fired", props);
    dispatch(classToEdit(props.indivClass));
  };

  const handleSubmit = () => {
    dispatch(props.myClassToEdit(editForm));
  };

  const toggleSignUp = () => {
    //console.log("toggleSignUp has been fired");
    if (isSignedUpFor(props.indivClass)) {
      
      handleUndoSignUp();
    } else {
      alert(`Your class has been added to your cart`)
      handleSignUp();
    }
  };

  const handleSignUp = () => {
    //console.log("handleSignUp has been fired: indiv class", props.indivClass);

    props.myClassesToSignUp(props.indivClass); // add class to dictionary of signed up classes
    props.addMyClass(props.indivClass);
  };

  const handleUndoSignUp = () => {
    // console.log(
    //   "handleUndoSignUp has been fired: indiv class",
    //   props.indivClass
    // );
    alert("The selected class has been removed from your cart")
    props.myUndoSignUp(props.indivClass); // assign class to false in dictionary of signed up classes
    props.removeMyClass(props.indivClass);
    // dispatch({ type: FETCHING_API_START });

    // axiosWithAuth()
    //   .delete(`/clientclasses/${indivClass.id}`) 
    //   .then((res) => {
    //     console.log("UNDO_SIGN_UP_FOR_CLASS response: ", res); 
    //     alert(res.data.message);
    //     dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.message });
    //   })
    //   .catch((error) => {
    //     dispatch({ type: FETCHING_API_FAILURE, payload: error });
    //     console.log("ERR_1: This error is from UNDO_SIGN_UP_FOR_CLASS", error);
    //   });

  };

  const isSignedUpFor = (indivClass) => {
    // props.classToSignUp is the dictionary of classes signed up for
    // console.log("props.classesToSignUp: ", props.classesToSignUp)
    return props.classesToSignUp[indivClass.id] ? true : false; // returns true or undef
  };

  {
    const classIsFull = number_of_students >= max_class_size;
    let buttonTitle = "sign it up";
    if (classIsFull) {
      buttonTitle = "full";
    } else if (isSignedUpFor(props.indivClass)) {
      buttonTitle = "unregister";
    }
    isInstructor ? (
      <Button onClick={handleEditButtonClick}>
        <EditIcon style={{ margin: "10", color: "555555" }} />
      </Button>
    ) : (
      <Button
        onClick={toggleSignUp}
        disabled={classIsFull}
        size="small"
        style={{ color: "555555" }}
      >
        {buttonTitle}
      </Button>
    );
  }

  return (
    <div>
      <React.Fragment>
        <Card
          className={classes.root}
          variant="outlined"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <CardContent style={{ textAlign: "center" }}>
            {/* // {isClassCard ? <button>Logout</button> : <button>Login</button>} */}
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {indivClass.class_type}
            </Typography>
            <Typography variant="h5" component="h2">
              {bull} {indivClass.class_name} {bull} <br />
            </Typography>
            <Typography component="h4">Where: {indivClass.location}</Typography>
            <Typography className={classes.pos} color="textSecondary">
              <br />
              When: {indivClass.class_date}
            </Typography>
            <Typography variant="body2" component="p">
              Duration: {displayTime(indivClass.duration)}
              <br />
              Kickoff Time: {indivClass.start_time}
              <br />
              Class Capacity: {indivClass.number_of_students}/
              {indivClass.max_class_size} <br />
            </Typography>
          </CardContent>
          <CardActions>
            {
              isInstructor ? (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleEditButtonClick}
                  disabled={props.disabled}
                  style={{
                    backgroundColor: props.disabled === true ? "red" : "#aaa",
                    borderRadius: "25px",
                    opacity: props.disabled === true ? "0.5" : "0.9",
                    width: '250px'
                  }}
                >
                  <EditIcon style={{ margin: "10", color: "555555" }} />
                </Button>
              ) : (
                <Button
                  onClick={toggleSignUp}
                  disabled={number_of_students >= max_class_size}
                  size="small"
                  style={{ color: "#555555" }}

                >
                  {number_of_students >= max_class_size
                    ? "full"
                    : isSignedUpFor(props.indivClass)
                    ? "unregister"
                    : "sign up"}
                </Button>
              )
            }
          </CardActions>
        </Card>
      </React.Fragment>
    </div>
  );
};
const displayTime = (duration) => {
  if (duration < 1) {
    return `${Math.round(duration * 60)} mins`;
  } else {
    if (duration % 1 === 0) {
      return `${duration} hour`;
    } else {
      return `${Math.floor(duration)} hour ${Math.round(
        (duration % 1) * 60
      )} mins`;
    }
  }
};

export default connectToStore(Class);
