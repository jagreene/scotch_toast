var React = require('react');
var ReactDOM = require('react-dom');
var Well = require('react-bootstrap').Well;
var Table = require('react-bootstrap').Table;
var Navbar = require('react-bootstrap').Navbar;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var OrderCard = React.createClass({
    handleClick: function(){
        this.props.deleteOrder(this.props.id)
    },

    render: function(){

        ingredientsSection = this.props.ingredients.map(function(ingredient, num){
            return (
                <tr>
                    <td>{num} </td>
                    <td> {ingredient} </td>
                </tr>
            )
        })
        return (
            <Col xs={12} md={12} lg={12}>
                <div className='orderCard'>
                    <h4> {this.props.name} </h4>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ingredient</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredientsSection}
                        </tbody>
                    </Table>
                    <button bsStyle="success" onClick={this.handleClick}> DONE! </button>
                </div>
            </Col>

        )
    }
})

var Main = React.createClass({

    getInitialState: function() {
        return {orders: []};
    },

    getOrders: function(){
        $.get('/api/orders')
        .done(function(orders){
            this.setState({orders: orders});
        }.bind(this));
    },

    componentDidMount: function(){
        this.getOrders();
        setInterval(getOrders, 5000);
    },

    deleteOrder: function(id){
        $.post('/api/delOrder', {id:id})
        .success(function(orders){
            console.log(orders)
            this.setState({orders: orders})
        }.bind(this));
    },

    render: function() {
        var orderList = this.state.orders.map(function(order){
            console.log(order)
            return (
                <OrderCard
                    id={order['_id']}
                    name={order.name}
                    ingredients={order.ingredients}
                    deleteOrder={this.deleteOrder}
                    key={order['_id']}
                />
            )
        }, this)
        return (
            <div className="Main">
                <Navbar fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Scotch Toast</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                </Navbar>
                <Grid>
                    <h3> Orders: </h3>
                    <br/>
                    <Row>
                        {orderList}
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
