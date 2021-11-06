import React, { useEffect, useState } from 'react'
import db from '../firebase';
import 'firebase/firestore';
import './PlanScreen.css'
import { useSelector } from "react-redux"
import { selectUser } from "../features/userSlice"
import { loadStripe } from "@stripe/stripe-js"

function PlanScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    // const [subscription, setSubscription]=useState(null);

// useEffect(()=>{
//     db.collecton('customers')
//     .doc(user.uid)
//     .collection('subscriptions')
//     .get()
//     .then(querySnapshot=>{
//         querySnapshot.forEach(async (subscription)=>{
//         setSubscription({
//             role: subscription.data().role,
//             current_period_end: subscription.data().trial_start.seconds,
//             current_period_start: subscription.data().current_period_start.seconds,
//         });
//     });
// });
// },[user.uid]);
// console.log(subscription);
// alert("hello")

    // use useEffect to fetch product from database
    useEffect(() => {
        db.collection('products')
            .where("active", "==", true)
            .get()
            .then((querySnapShot) => {
                const products = {};
                querySnapShot.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection('prices').get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                })
                setProducts(products);
            });

    }, [])

    // console.log(products);

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers')
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            })

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                alert(`An error occured: ${error.message}`);
            }

            if (sessionId) {
                const stripe = await loadStripe("pk_test_51JrgRYSHFyPIWw1q5x6r0QHW6a52FVxBWco73hkEQW2xIKNtrO8A56xViC1reS2ha4LF3DxrcdsHI70EXwPQHkqG008iwmlexM");
              stripe.redirectToCheckout({ sessionId });
            }

           
        })
    };
    return (
        <div className="planScreen">
            {Object.entries(products).map(([productId, productData]) => {



                return (
                    <div className="planScreen_plan">
                        <div className="planScreen_info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => loadCheckout(productData.prices.priceId)}>
                            Subscribe
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlanScreen
