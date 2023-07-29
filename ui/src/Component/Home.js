import React from "react"
// Function to generate a random color in hexadecimal format
const getRandomColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  };

  // Generate a random color for the welcome text
  const welcomeColor = getRandomColor()
const Home = (props) => {

    return (
        <div className="container">
            <h1 style={{color:welcomeColor}}>welcome</h1>
            <div className="row divPadding">
                <div className="col-md-6">
                    <div className="card shodow">
                        <div className="card-body">

                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <img src="https://img.freepik.com/free-psd/3d-rendering-isometric-ecologic-concept_23-2149859680.jpg?size=626&ext=jpg&ga=GA1.2.113474540.1688991413&semt=ais" alt="Electric" className="img"></img>
                </div>
            </div>
        </div>
    )
}
export default Home