import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    };

    updatePurchaseState (ingredients) { 
        const purchaseable = Object.values(ingredients)
        .reduce((previous, current) => previous || current > 0);
        this.setState( { purchaseable } );
        }

    /*updatePurchaseState = (ingredients) => {
        const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el
        } , 0);
        this.setState({
            purchaseable: sum > 0 
        });
    };*/

    addIngredientHandler = (type) => {
        //ancien compte
        const oldCount = this.state.ingredients[type];
        //on l'incremente
        const updateCount = oldCount + 1;
        //on copie l'obj ingredients
        const updatedIngredients = {...this.state.ingredients};
        //on met a jour le type d'ingredient ajouté dans la copie
        updatedIngredients[type] = updateCount;
        //calcul du nouveau prix
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        //mise a jour du nouveau prix et compte
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        }, this.updatePurchaseState(updatedIngredients));
        //this.updatePurchaseState(updatedIngredients)
    };

    deleteIngredientHandler = (type) => {
        //ancien compte
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        //on le decremente
        const updateCount = oldCount - 1;
        //on copie l'obj ingredients
        const updatedIngredients = {...this.state.ingredients};
        //on met a jour le type d'ingredient ajouté dans la copie
        updatedIngredients[type] = updateCount;
        //calcul du nouveau prix
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        //mise a jour du nouveau prix et compte
        this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }, this.updatePurchaseState(updatedIngredients));     
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
        console.log('a');
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        console.log('a');
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    <OrderSummary   cancel={this.purchaseCancelHandler}
                                    continue={this.purchaseContinueHandler} 
                                    ingredients={this.state.ingredients}
                                    price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientDeleted={this.deleteIngredientHandler}
                    disabled={disabledInfo} 
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler} />       
            </Aux>
        );
    }
}

export default BurgerBuilder;