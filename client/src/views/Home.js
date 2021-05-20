import FitnessTwo from '../assets/fitnessThree.jpg'

export default function Home() {

    return (
        <div className={'d-flex flex-column justify-content-center'}>
        <h1 className={'d-flex justify-content-center display-1'} >
            Welcome to Anytime Fitness
        </h1>   
        <img className={'marketing-resizer'} src={FitnessTwo} alt={'fitnessTwo'}/>
        </div>
    )
}