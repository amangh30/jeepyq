import a from "../assets/360_F_214567514_hGbTMUq06pJIGKiXA248l43E3hU9Q08x.jpg"
import b from "../assets/images (1).jpg"
import c from "../assets/images (2).jpg"


import "../style/Home.css"
const Home = () => {
    return (
        <div>
    <div class="nav">Website name</div>
    <div class="dropdowns"></div>
    <div class="container">
        <div class="card">
            <div class="photu">
                <img src={a} alt=""/>
            
            </div>
            <h2>Physics</h2>
            
        </div>
        <div class="card">
            <div class="photu">
                <img src={b} alt=""/></div>
            <h2>Chemistry</h2>            
        </div>
        <div class="card">
            <div class="photu"><img src={c} alt=""/></div>
            <h2>Mathematics</h2>            
        </div>        
    </div>
</div>
    )
}
export default Home