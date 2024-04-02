
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, updateDoc, writeBatch, setDoc, addDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { auth } from '../components/firebase';
import { signOut } from 'firebase/auth'; // M
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import SearchBar from './SearchBar';
import ShoppingCart from './ShoppingCart';
import OrderHistory from './OrderHistory';
import Login from './Login';
import AddProduct from './AddProduct';
import ProductListAdmin from './ProductListAdmin';
import Image from 'next/image';
import SuccessStorySubmission from './SuccessStorySubmission';
import SuccessStories from './SuccessStories';
import QuitSmokingInfo from './QuitSmokingInfo';
import dynamic from 'next/dynamic';
import QuitSmokingVideos from './QuitSmokingVideos';
import ProgressTracker from './ProgressTracker';
import { dialogflowConfig } from '../config';
import Chatbot from '../components/Chatbot';
import AccessibilityMenu from './AccessibilityMenu'; 
import Layout from '../components/Layout'; //


import { config } from 'dotenv';
await config();

const SmokingCentersMap = dynamic(() => import('../Components1/SmokingCentersMap'), { ssr: false });

const firebaseConfig = {
  apiKey: "AIzaSyAgkAnBVEZF8uR1g-riwHY3CRekHXt5n7o",
  authDomain: "solent-e-stores.firebaseapp.com",
  projectId: "solent-e-stores",
  storageBucket: "solent-e-stores.appspot.com",
  messagingSenderId: "1023431440643",
  appId: "1:1023431440643:web:91f554fe21ec417ae11136",
  measurementId: "G-72FFPE3BR9" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const commonButtonStyle = {
  backgroundColor: '#0052cc',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  marginTop: '20px', 
};

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [userBalance, setUserBalance] = useState(50000);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const fetchProductsFromFirestore = async () => {
      const productsCollectionRef = collection(db, 'products');
      const querySnapshot = await getDocs(productsCollectionRef);
      const productsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(productsData);
      setFilteredProducts(productsData);
    };

    fetchProductsFromFirestore();
  }, [db]);

  const [authChecked, setAuthChecked] = useState(false); 
  useEffect(() => {
    console.log('Setting up onAuthStateChanged listener');
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      console.log('onAuthStateChanged triggered', userAuth);
      if (userAuth) {
        console.log('User is signed in:', userAuth.email);
        setUser({ uid: userAuth.uid, email: userAuth.email, username: userAuth.email.split('@')[0], isAdmin: false });
      } else {
        console.log('User is signed out');
        setUser(null);
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    const fetchProductsFromFirestore = async () => {
      const productsCollectionRef = collection(db, 'products');
      const querySnapshot = await getDocs(productsCollectionRef);
      const productsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(productsData);
      setFilteredProducts(productsData);
    };

    fetchProductsFromFirestore();
  }, [db]);

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = product.type.toLowerCase().includes(searchTerm.toLowerCase());
      const manufacturerMatch = product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || typeMatch || manufacturerMatch;
    });
    setFilteredProducts(filtered);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
  
    const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
    if (!user || userBalance < totalCost) {
      alert('Insufficient balance to make the purchase.');
      return;
    }


    function Chatbot() {
      console.log('Chatbot rendering'); // Debugging Chatbot rendering
    
      return (
        <div>Chatbot is here!</div>
      );
    }
  
   
    const productDocsPromises = cartItems.map(cartItem => getDoc(doc(db, 'products', cartItem.id)));
    const productDocs = await Promise.all(productDocsPromises);
  


for (let i = 0; i < cartItems.length; i++) {
  const productDoc = productDocs[i];
  const cartItem = cartItems[i];

  if (!productDoc.exists()) {
    alert(`Product with ID ${cartItem.id} not found.`);
    return;
  }

  const productData = productDoc.data();
  const stockFieldName = productData.quantityInStock !== undefined ? 'quantityInStock' : 'quantity';
  const stockQuantity = Number(productData[stockFieldName]);

  if (isNaN(stockQuantity)) {
    alert(`Invalid stock quantity for product: ${cartItem.name}.`);
    return;
  }

  if (cartItem.quantity > stockQuantity) {
    alert(`Insufficient stock for product: ${cartItem.name}. Only ${stockQuantity} left.`);
    return;
  }
}
  
   
    setUserBalance(userBalance - totalCost);
  
    const userBalanceRef = doc(db, 'user_balance', 'user_balance');
    const userBalanceSnapshot = await getDoc(userBalanceRef);
  
    if (userBalanceSnapshot.exists()) {
      const newBalance = userBalanceSnapshot.data().balance - totalCost;
      await updateDoc(userBalanceRef, { balance: newBalance });
    } else {
      await setDoc(userBalanceRef, { balance: userBalance - totalCost });
    }
  
    const batch = writeBatch(db);

    for (const cartItem of cartItems) {
      const productRef = doc(db, 'products', cartItem.id);
      const productDoc = await getDoc(productRef); 
    
      if (productDoc.exists()) {
        const productData = productDoc.data();
        const stockFieldName = productData.quantityInStock !== undefined ? 'quantityInStock' : 'quantity';
        const newQuantity = productData[stockFieldName] - cartItem.quantity;
    
        if (newQuantity >= 0) {
          batch.update(productRef, { [stockFieldName]: newQuantity }); 
        } else {
          console.error(`Insufficient quantity in stock for product with ID ${cartItem.id}`);
        }
      } else {
        console.error(`Product with ID ${cartItem.id} not found.`);
      }
    }
    
    try {
      await batch.commit(); 
    
      
      const updatedProducts = products.map(product => {
        const cartItem = cartItems.find(item => item.id === product.id);
        if (cartItem) {
          const newQuantity = product.quantityInStock - cartItem.quantity;
          return { ...product, quantityInStock: newQuantity };
        }
        return product;
      });
    
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts); 
    
    
      const newOrder = {
        id: new Date().getTime(),
        date: new Date().toLocaleString(),
        products: cartItems,
      };
    
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
      setCartItems([]); 
    
    } catch (error) {
      console.error('Error committing batch:', error);
    }
  };
  const [showSubmitStory, setShowSubmitStory] = useState(false);
  const [showSuccessStories, setShowSuccessStories] = useState(false);
  const [showQuitInfo, setShowQuitInfo] = useState(false);
  const QuitSmokingVideos = dynamic(() => import('./QuitSmokingVideos'), { ssr: false });
  const [showVideos, setShowVideos] = useState(false);
  const [showProgressTracker, setShowProgressTracker] = useState(false);

  
  const [showMap, setShowMap] = useState(false);
  const smokingCenters = [
    
    {
      name: "The Wellbeing Service",
      lat: 50.8167, 
      lng: -1.0833, 
    },
    {
      name: "Southampton City Council",
      lat: 50.9064158150475, 
      lng: -1.4045619965541956, 
    },
    {
      name: "Smokefree Island",
      lat: 50.73212674201074, 
      lng: -1.1598803637273136, 
    },
    {
      name: "Wiltshire Health Improvement Hub",
      lat: 51.07248978421504, 
      lng: -1.7910252809528742, 
    },
    {
      name: "Chichester Wellbeing",
      lat: 50.83550065003725, 
      lng: -0.773983001706881, 
    },
    {
      name: "Smokefree Hampshire",
      lat: 51.28157321708622, 
      lng: -1.0587000847460175, 
    },
    {
      name: "One You Surrey Stop Smoking Service",
      lat: 51.08783981672396, 
      lng: -0.732536017844683, 
    },
    {
      name: "Arun Wellbeing",
      lat: 50.8081326138236, 
      lng: -0.5384818315514395, 
    },
    {
      name: "National Stop Smoking Centres",
      lat: 51.32071058033755, 
      lng: -0.7287700136798692, 
    },
    {
      name: "One You Surrey Stop Smoking Service",
      lat: 51.24701998658787, 
      lng: -0.5927851795212072, 
    },
    {
      name: "Smokefreelife Berkshire - Reading",
      lat: 51.462915220047925, 
      lng: -0.9881022346738294, 
    },
    {
      name: "Wiltshire Health Improvement Hub",
      lat: 51.3184806217037, 
      lng: -2.20848694757984, 
    },
    {
      name: "Adur & Worthing Wellbeing",
      lat: 50.8141859012562, 
      lng: -0.3731895982680665, 
    },
    {
      name: "Horsham District Wellbeing",
      lat: 51.06340479432893, 
      lng: -0.32963195448285787, 
    },
    {
      name: "Swindon Stop Smoking Service",
      lat: 51.55969968410206, 
      lng: -1.7788408212444005, 
    },
    {
      name: "Wiltshire Health Improvement Hub Chippenham",
      lat: 51.46118134489227, 
      lng: -2.1149332523333326, 
    },
    {
      name: "Livewell Dorset",
      lat: 50.61639794711477, 
      lng: -2.456006527006338, 
    },
    {
      name: "Smokefreelife Berkshire - Royal Borough Of Windsor And Maidenhead",
      lat: 51.52280480300079, 
      lng: -0.7184865195229155, 
    },
    {
      name: "Hcrg Care Group - Community Wellbeing Hub Bath And North East Somerset",
      lat: 51.3581767201717, 
      lng: -2.3701179028533375, 
    },
    {
      name: "One You Surrey Stop Smoking Service",
      lat: 51.39292598802346, 
      lng: -0.4469991326967333, 
    },
    {
      name: "Health & Wellbeing Slough",
      lat: 51.52038815497302, 
      lng: -0.6226534247036584, 
    },
    {
      name: "Crawley Wellbeing",
      lat: 51.09726834067089, 
      lng: -0.19123111665080594, 
    },
    {
      name: "Healthy Lifestyles Team",
      lat: 50.821532399029635, 
      lng: -0.1411257982190925, 
    },
    {
      name: "Mid Sussex Wellbeing",
      lat: 51.00202701917649, 
      lng: -0.10885249079577908, 
    },
    {
      name: "One You Surrey Stop Smoking Service",
      lat: 51.32966042794474, 
      lng: -0.27039631073329545, 
    },
    {
      name: "Stop For Life Oxon",
      lat: 51.75097760456719, 
      lng: -1.2569099664683905, 
    },
    {
      name: "Kick It Kingston Upon Thames Stop Smoking Service",
      lat: 51.407454308983, 
      lng: -0.30494824055685266, 
    },
    {
      name: "One You Surrey Stop Smoking Service Redhill",
      lat: 51.25119102067602, 
      lng: -0.1557832657550513, 
    },
    {
      name: "Hillingdon Stop Smoking Service",
      lat: 51.54855129959911, 
      lng: -0.48148643962916615, 
    },
    {
      name: "One You Merton",
      lat: 51.41173607554009, 
      lng: -0.19143109856003068, 
    },
    {
      name: "One You South Gloucestershire",
      lat: 51.540969784572454, 
      lng: -2.4242201959729943, 
    },
    {
      name: "Everyone Health Stop Smoking Service Bristol (For Pregnant Women, Or People With Long Term Health Conditions)",
      lat: 51.40747786809427, 
      lng: -2.621435403843625, 
    },
    {
      name: "Healthy Hounslow Stop Smoking Service",
      lat: 51.49138416403391, 
      lng: -0.2661103605971647, 
    },
    {
      name: "Wandsworth Stop Smoking Service",
      lat: 51.457483932515764, 
      lng: -0.19088049233169604, 
    },
    {
      name: "Via - Smoking Cessation - Harrow",
      lat: 51.578421499087156, 
      lng: -0.34284642356421097, 
    },
    {
      name: "One You Kensington And Chelsea",
      lat: 51.51374780983722, 
      lng: -0.2196958511899519, 
    },
    {
      name: "One You Westminster",
      lat: 51.51370774876478, 
      lng: -0.21973876653250746, 
    },
    {
      name: "Brent Tobacco Dependency Service",
      lat: 51.55943027471019, 
      lng: -0.28179779643649083, 
    },
    {
      name: "Be Healthy Bucks",
      lat: 51.81661123967494, 
      lng: -0.82161891457558, 
    },
    {
      name: "Lambeth Stop Smoking Service",
      lat: 51.47976681382028, 
      lng: -0.12576521930933252, 
    },
    {
      name: "Southwark Stop Smoking Service",
      lat: 51.459713382194906, 
      lng: -0.07918567963529086, 
    },
    {
      name: "Day Lewis East Dulwich",
      lat: 51.46116225214142, 
      lng: -0.08028815683547562, 
    },
    {
      name: "Day Lewis Pharmacy",
      lat: 51.46185364446356, 
      lng: -0.07751494655369612, 
    },
    {
      name: "Maddock Way Pharmacy",
      lat: 51.48259586089978, 
      lng: -0.10277531297065887, 
    },
    {
      name: "Lloyds Pharmacy",
      lat: 51.45757352147014, 
      lng: -0.07051464180903011, 
    }
  ];
  
  



  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
        setCartItems(updatedCartItems);
      } else {
        const updatedCartItems = cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCartItems);
      }
    }
  };

  const handleAddProduct = async (newProduct) => {
    if (!newProduct.price) {
      alert('Please enter the price for the new product.');
      return;
    }

    try {
      const productsCollectionRef = collection(db, 'products');
      const newProductDocRef = await addDoc(productsCollectionRef, newProduct);

      const newProductId = newProductDocRef.id;

      setProducts((prevProducts) => [
        ...prevProducts,
        { ...newProduct, id: newProductId },
      ]);
      setFilteredProducts((prevProducts) => [
        ...prevProducts,
        { ...newProduct, id: newProductId },
      ]);
    } catch (error) {
      console.error('Error adding product to Firestore:', error);
      alert('Failed to add the product to Firestore.');
    }
  };

  const handleEditProduct = (editedProduct) => {
    const productIndex = products.findIndex((product) => product.id === editedProduct.id);

    if (productIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts[productIndex] = editedProduct;
      setProducts(updatedProducts);

      if (filteredProducts.length > 0) {
        const filteredProductIndex = filteredProducts.findIndex((product) => product.id === editedProduct.id);
        if (filteredProductIndex !== -1) {
          const updatedFilteredProducts = [...filteredProducts];
          updatedFilteredProducts[filteredProductIndex] = editedProduct;
          setFilteredProducts(updatedFilteredProducts);
        }
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
     
      const productRef = doc(db, 'products', productId);
      await deleteDoc(productRef);

     
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);

      if (filteredProducts.length > 0) {
        const updatedFilteredProducts = filteredProducts.filter((product) => product.id !== productId);
        setFilteredProducts(updatedFilteredProducts);
      }
    } catch (error) {
      console.error('Error deleting product from Firestore:', error);
      alert('Failed to delete the product from Firestore.');
    }
  };

  const toggleQuitInfo = () => {
    setShowQuitInfo(prevState => !prevState);
  };

  const mapContainerStyle = {
    border: '1px solid #ccc', 
    padding: '20px', 
    margin: '20px', 
    maxWidth: '800px', 
    width: '100%', 
    height: '400px', 
  };

  

  return (
    <Layout>
    <div>
      <div
        style={{
          width: '300px',
          height: '200px',
          borderRadius: '20px',
          overflow: 'hidden',
          background: `url('/logo.png') no-repeat center center`,
          backgroundSize: 'cover',
        }}
      ></div>
      <h1>Welcome to Learn2Quit Pro</h1>
      <h4>"Knowledge to Quit, Tools to Succeed"</h4>
      <script src="https://website-widgets.pages.dev/dist/sienna.min.js" defer></script>
      

      {user ? (
        <div>
          
          <p>Welcome, {user.username}! {user.isAdmin ? '(Admin)' : '(User)'}</p>
          <p>Virtual Balance: ${userBalance.toFixed(2)}</p>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
            <button
              style={{
                backgroundColor: '#0052cc',
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onClick={() => signOut(auth).then(() => {
                console.log('User signed out successfully');
                setUser(null);
              }).catch((error) => {
                console.error('Error signing out:', error);
              })}
            >
              Logout
            </button>
          </div>

          <button
            onClick={() => { setShowSubmitStory(false); setShowSuccessStories(false); }}
            style={{ ...commonButtonStyle, marginRight: '10px' }}
          >
            Home
          </button>
          <button
      onClick={(event) => {
        event.preventDefault();
        setShowSubmitStory(!showSubmitStory);
      }}
      style={{ ...commonButtonStyle, marginRight: '10px' }}
    >
      {showSubmitStory ? 'Hide Submit Story' : 'Show Submit Story'}
    </button>

    <button
      onClick={(event) => {
        event.preventDefault();
        setShowSuccessStories(!showSuccessStories);
      }}
      style={{ ...commonButtonStyle, marginRight: '10px' }}
    >
      {showSuccessStories ? 'Hide Success Stories' : 'Show Success Stories'}
    </button>
    <button
      onClick={() => setShowQuitInfo(!showQuitInfo)}
      style={{ ...commonButtonStyle, marginLeft: '10px' }}
    >
      {showQuitInfo ? 'Hide Quitting Smoking Info' : 'Learn About Quitting Smoking'}
    </button>
    <button
      onClick={() => setShowMap(!showMap)}
      style={{ ...commonButtonStyle, marginLeft: '10px' }}
    >
      {showMap ? 'Hide' : 'Show'} Smoking Centers Map
    </button>
    <button
      onClick={() => setShowVideos(!showVideos)}
      style={{ ...commonButtonStyle, marginLeft: '10px' }}
    >
      {showVideos ? 'Hide' : 'Show'} Quitting Smoking Videos
    </button>


          {typeof window !== 'undefined' && showMap && (
            <div
              style={{
                border: '1px solid #ccc',
                padding: '20px',
                margin: '20px',
                maxWidth: '800px',
                width: '100%',
                height: '400px',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <SmokingCentersMap centers={smokingCenters} />
            </div>
          )}

          {showQuitInfo && <QuitSmokingInfo onClose={toggleQuitInfo} />}

          {showVideos && <QuitSmokingVideos />}

          <button
      onClick={() => setShowProgressTracker(!showProgressTracker)}
      style={{ ...commonButtonStyle, marginLeft: '10px' }}
    >
      {showProgressTracker ? 'Hide' : 'Show'} Progress Tracker
    </button>

          {showProgressTracker && <ProgressTracker />}

          {showSubmitStory && <SuccessStorySubmission />}

          {showSuccessStories && <SuccessStories isAdmin={user?.isAdmin} />}

          {!showSubmitStory && !showSuccessStories && (
            <>
              <SearchBar onSearch={handleSearch} />
              {user.isAdmin && <AddProduct onAddProduct={handleAddProduct} />}
              {user.isAdmin && (
                <ProductListAdmin
                  products={products}
                  onEditProduct={handleEditProduct}
                  onDeleteProduct={handleDeleteProduct}
                />
              )}
              <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
              <ShoppingCart
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
              <button
                onClick={handleCheckout}
                style={{
                  backgroundColor: '#0052cc',
                  color: 'white',
                  padding: '10px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  marginTop: '20px',
                }}
              >
                Checkout
              </button>
              <OrderHistory
                orders={orders}
                onSelectOrder={handleSelectOrder}
                selectedOrder={selectedOrder}
              />
            </>
          )}
       {}
          {showScrollToTop && (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
          <a href="#" onClick={scrollToTop} style={scrollButtonStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </a>
        </div>
      )}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      
      <Chatbot />
      
      <footer style={{ textAlign: 'center', marginTop: '50px',color: '#555' }}>
      <p>&copy; 2024 Learn2Quit Pro. All rights reserved.</p>
    </footer>
    </div>
    </Layout>
  );
}


const scrollButtonStyle = {
  fontSize: '24px',
  textDecoration: 'none',
  color: '#007bff',
  backgroundColor: '#fff',
  padding: '10px 15px',
  borderRadius: '50%',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
  display: 'inline-block',
};

export default App;

