import React, { useState } from 'react';
import '../src/Model.css';
import ImageSelect from './ImageSelect'; 

const images = [
    { name: "coffie", path: "image/coffie.jpg" },
    { name: "Bisarra", path: "image/bisara.jpg" },
    { name: "soda", path: "image/soda.jpg" },
    { name: "pizza", path: "image/pizza.jpg" },
    { name: "orange jus", path: "image/orange.png" },
    { name: "banane jus", path: "image/banane.png" },
    { name: "oulmes", path: "image/Oulmes.png" },
    { name: "petit dejeuner", path: "image/petit-dejeuner.jpg" },
];

const Model = ({ open, close, onAdd }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = { name, price, category, image };
        if (!name || !price || !category || !image) {
            alert('Please fill all the fields');
        } else {
            onAdd(newItem);
            setName('');
            setPrice('');
            setCategory('');
            setImage(null);
            close(false)

        }
      
    };

    if (!open) {
        return null;
    } else {
        return (
            <div className='bc'>
                
                <div className='d'>
                    <button className="close-button" onClick={close}>x</button>
                    <div className='divform'>
                        <h1>Add new item</h1>
                        <form onSubmit={handleSubmit}>
                            <label>Name:</label>
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} /><br />
                            <label>Price:</label>
                            <input type="number" required value={price} onChange={(e) => setPrice(parseInt(e.target.value))} /><br />
                            <label>Category:</label>
                            <select value={category} required onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                <option value="drinks">Drinks</option>
                                <option value="coffee">Coffee</option>
                                <option value="food">Food</option>
                            </select><br />
                            <label>Image:</label>
                            <ImageSelect images={images} value={image} onChange={(e) => setImage(e)} /><br />
                            <button type='submit' className='savebt'>Save</button>
                        </form>
                    </div>
                </div>
                 
            </div>
            
        );
    }
};

export default Model;
