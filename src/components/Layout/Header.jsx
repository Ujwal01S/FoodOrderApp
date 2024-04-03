
import {Fragment} from 'react';
import mealsimage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header= (props) => {
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>

            <div className= {classes['main-image']} >               
                <img src={mealsimage} alt='A table full of delicious meals!' />               
            </div>
        </Fragment>
    )

    
};

export default Header;