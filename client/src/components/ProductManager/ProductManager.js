import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import Products from './Products/Products'

import './ProductManager.css';


class ProductManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            quantity: '',
            price: '',
            products: [
                {
                    "_id": "",
                    "quantity": 0,
                    "name": "",
                    "price": 0
                },
            ],
            open: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:9000/product', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({ products: response });
        })
    }

    handleFormOpenClose = () => {
        this.setState({ open: !this.state.open })
    };

    formInputChangeHandler = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleFormSave = () => {
        fetch('http://localhost:9000/product', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                quantity: this.state.quantity,
                price: this.state.price
            })
        }).then(() => {
            this.props.history.push('/save');
            this.props.history.push('/');
        })
    }

    render() {
        return (
            <div className="products-container">
                {this.props.loggedIn ? <>

                    <div className="product-container product-list">
                        {this.state.products.length >= 1 ? < Products products={this.state.products} /> : null}
                    </div>
                    <div className="add-icon-container">
                        <IconButton aria-label="add" onClick={() => this.handleFormOpenClose()}>
                            <AddCircleOutlineOutlinedIcon fontSize="large" color="action" />
                        </IconButton>
                    </div>

                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New product</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To add a new product fill the empty spaces!
                          </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Product Name"
                                onKeyUp={e => this.formInputChangeHandler(e)}
                            />
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="quantity"
                                label="Quantity"
                                type="number"
                                onKeyUp={this.formInputChangeHandler}
                            />
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="price"
                                label="Price"
                                type="number"
                                onKeyUp={this.formInputChangeHandler}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleFormOpenClose} color="primary">
                                Cancel
                        </Button>
                            <Button onClick={this.handleFormSave} color="primary">
                                Save
                        </Button>
                        </DialogActions>
                    </Dialog></>
                    : <Alert severity="error">{"You have to log in first!"}</Alert>}
            </div>
        )
    }
}

export default withRouter(ProductManager);
