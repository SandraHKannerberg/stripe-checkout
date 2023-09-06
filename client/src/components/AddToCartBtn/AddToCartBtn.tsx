import { Button  } from 'antd';

function addToCart() {
    console.log('Tillagd i varukorgen')
}

function AddToCartBtn() {
  return (
    <div>
        <Button type='primary' onClick={addToCart}>Lägg till i kundkorgen</Button>
    </div>
  )
}

export default AddToCartBtn