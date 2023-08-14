import { Fragment } from 'react/cjs/react.production.min';
import classes from '../Layout/Header.module.css';
import meals from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return  (
    <Fragment>
        <header className={classes.header}> 
            <h1>ReactMeals</h1>
            <HeaderCartButton onCartClick= {props.onCartClick}/>
        </header>
        <div className={classes['main-image']}>
            <img src={meals} alt='A table full of delicious food' />
        </div>
    </Fragment>)

}

export default Header;