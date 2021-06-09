import React from 'react'
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import './Products.css'

export default function Products({ products }) {
    const history = useHistory();

    function handleProductDelete(id) {
        fetch('http://localhost:9000/product/' + id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/del');
            history.push('/');
        })
    }

    return (
        <div className="product-list-container">
            {products.map((product) => {
                return <Card className="product-container">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Product Name: {product.name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Quantity: {product.quantity}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Price: {product.price}
                        </Typography>
                    </CardContent>
                    <IconButton aria-label="delete" id={product._id} onClick={() => handleProductDelete(product._id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Card>
            })}
        </div>

    )
}
