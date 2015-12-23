var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap').Button;
var Image = require('react-bootstrap').Image;
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var IngredientCard = React.createClass({
    handleClick: function(){
        this.props.addIngredient(this.props.name)
    },

    render: function(){
        if(this.props.active){
            var className="ingredientCard active nohighlight";
        } else {
            var className="ingredientCard nohighlight";
        }
        return (
            <Col xs={6} md={4} lg={3}>
                <div className={className} onClick={this.handleClick}>
                    <Image src={"images/"+ this.props.src} responsive/>
                    <h3 className="ingredientName">{this.props.name}</h3>
                </div>
            </Col>

        )
    }
});

var Main = React.createClass({

    getInitialState: function() {
        return {order: [], ingredients:[]};
    },

    componentDidMount: function(){
        $.get('/api/ingredients')
        .done(function(ingredients){
            this.setState({ingredients: ingredients});
        }.bind(this));
    },

    addIngredient: function(ingredient) {
        var order = this.state.order;
        var index = order.indexOf(ingredient)
        if(index===-1){
            order.push(ingredient);
        } else {
            order.splice(index, 1);
        }
        console.log(order);
        this.setState({
            order: order
        });
    },

    postOrder: function(){
        var order = {ingredients: this.state.order};
        console.log(order);
        $.post('/api/order', order)
        .done(function(){
            this.setState({order:[]});
        }.bind(this));
    },

    render: function() {
        ingredientNodes = this.state.ingredients.map(function(ingredient){
            var active = this.state.order.indexOf(ingredient.name)>-1 ? true : false
            return(
                <IngredientCard
                    src={ingredient.image}
                    name={ingredient.name}
                    active={active}
                    key={ingredient.name}
                    addIngredient={this.addIngredient}
                />
            )
        }, this);

        return (
            <div className="Main">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Scotch Toast</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <Button nabItem={true} onClick={this.postOrder} bsStyle="success">Order!</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Grid>
                    <Row>
                        {ingredientNodes}
                    </Row>
                </Grid>
            </div>
        );
    }
});



function run() {
    ReactDOM.render(<Main />, document.getElementById("target"));
}

if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', run);
} else {
    window.attachEvent('onload', run);
}
