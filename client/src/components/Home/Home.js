import React from 'react';

const Home = () => {
    return (
        <div>
            {user ? 
                <React.Fragment>
                    <div>Hello {user}!</div>
                    <div>{data}</div>
                </React.Fragment> :
                <React.Fragment>
                    Please Register or Login
                </React.Fragment>
            }
            
        </div>
    )
}

export default Home;