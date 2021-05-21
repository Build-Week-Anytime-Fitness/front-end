import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles({
  root: {
    minWidth: 310,
    opacity: .9,
    fontSize: 22,
    margin: '10px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 12,
    fontSize: 22,
    color: 'white'
  },
}); // material UI styles


export default function Class (props) {
  let { indivClass, allClasses } = props;
  // console.log("Props from class:", props);

  // let { classId } = useParams();
  // console.log("classId from Class: ", classId); // gets the classId, A STRING


  // Determines location from useLocation(), if "/instructors" is found, set isInstructor to true, trigger positive conditional render in card
  let { pathname } = useLocation();
  // console.log("pathname from Class: ", pathname); // gets the location, looking for "/instructors", A STRING
  let isInstructor = false;
  if (pathname === "/instructors") {
    isInstructor = true;
  }


  // material UI code
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


  return (
    <>


      <Card className={classes.root} variant="outlined" >
      <CardContent style={{textAlign: "center"}}>
      {/* // {isClassCard ? <button>Logout</button> : <button>Login</button>} */}
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {indivClass.classType}
        </Typography>
        <Typography variant="h5" component="h2">
          {bull} {indivClass.className} {bull}
        </Typography>
        <Typography className={classes.pos} color="textSecondary"><br/>
      
        {indivClass.classDate}
        </Typography>
        <Typography variant="body2" component="p">
          {indivClass.intensity} intensity<br/>
          Location: {indivClass.location}<br/>
          {indivClass.duration} hour<br/>
          starts at {indivClass.startTime}<br/>
          {indivClass.numberOfStudents}/{indivClass.maxClassSize} students signed up<br/>
        </Typography>
      </CardContent>
      <CardActions>

        { isInstructor ? <EditIcon style={{ margin: '10', color: '555555'}}/> :  <Button size="small" style={{ color: '555555'}}>Sign Up</Button> }

      </CardActions>
      
    </Card>

    </>
  )
};
