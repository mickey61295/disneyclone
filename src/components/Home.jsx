import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import db from '../firebase'
import {setMovies} from '../features/movie/movieSlice'
import {selectUserName} from '../features/user/userSlice'
import ImgSlider from './ImgSlider'
import NewDisney from './NewDisney'
import Originals from './Originals'
import Recommends from './Recommends'
import Trending from './Trending'
import Viewers from './Viewers'

const Home = () => {

    const dispatch = useDispatch()
    const userName = useSelector(selectUserName)
    let recommends = []
    let trending = []
    let originals = []
    let newDisney = []

    useEffect(()=>{
        db.collection('movies').onSnapshot(snapShot =>{
            snapShot.docs.map(doc => {
                switch(doc.data().type){
                    case 'recommend':
                        recommends = [...recommends, { id: doc.id, ...doc.data() }];
                        break;
                    case 'new':
                        newDisney = [...newDisney, {id:doc.id, ...doc.data()}]
                        break;
                    case 'original':
                        originals = [...originals, {id:doc.id, ...doc.data()}]
                        break;
                    case 'trending':
                        trending = [...trending, {id:doc.id, ...doc.data()}]
                        break;
                    default:
                        break;
                }
            })
            dispatch(setMovies({
                recommends,
                newDisney,
                originals,
                trending
            }))
        })
        
    },[userName])
    return (

        <Container>
            <ImgSlider />
            <Viewers/>
            <Recommends/>
            <NewDisney/>
            <Originals/>
            <Trending/>
        </Container>
    )
}

const Container = styled.main`
position:relative;
min-height:calc(100vh - 250px);
overflow-x:hidden;
display:block;
top:72px;
padding:0 calc(3.5vw * 5px);

&:after{
    background:url('/images/home-background.png') center no-repeat fixed;
    content:'';
    position:absolute;
    inset:0px;
    opacity:1;
    z-index:-1;
}

`

export default Home
