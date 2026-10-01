import react, { useContext , useState } from 'react'
import feroza from "../feroza.svg"
import { IoSearchCircleOutline } from 'react-icons/io5'
import { FaCircleUser } from "react-icons/fa6"
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { VscCollectionSmall } from "react-icons/vsc";
import { MdConnectWithoutContact } from "react-icons/md";
import { MdShoppingCartCheckout } from "react-icons/md";
import { ShopDataContext } from '../context/ShopContext.jsx';
import { toast } from 'react-toastify';





import axios from 'axios';



   function Nav()  {

    let {getCurrentUser, userData, setUserData} = useContext(userDataContext);
    let {serverUrl} = useContext(authDataContext);
    const navigate = useNavigate();
   
    let { showSearch , setShowSearch  ,  search , setSearch , getCardCount } = useContext(ShopDataContext)
 
    let [showProfile , setShowProfile] =useState(false)
      const handleLogout = async () => {
        try  
        {
         const result = await axios.post(`${serverUrl}/api/auth/logout`, {}, {withCredentials: true});
         console.log(result.data)
         if (setUserData) {
        setUserData(null);
      }
      
      // Re-check authentication state from backend
     
      setShowProfile(false);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
          
      }

     return (
       <div className="w-[100vw]  h-[70px] bg-[#ecfafaec] z-10 fixed
       top-0 flex items-center justify-between px-[30px] shadow-md shadow-black ">
        <div className="w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px]" >
            <img src={feroza} alt="" className='w-[30px]'/>
            <h1 className='text-[25px] text-[black] font-sans'>Feroza</h1>


        </div>

        <div className="w-[50%] lg:w-[40%] hidden md:flex" >
            <ul className='flex items-center justify-center gap-[19px] text-[white]'>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl'
                onClick={() => navigate('/')}>HOME</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl'
                onClick={() => navigate('/collections')}>COLLECTIONS</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl'
                onClick={() => navigate('/about')}>ABOUT</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl'
                onClick={() => navigate('/contact')}>CONTACT</li>

            </ul>

        </div>



        <div className='w-[30%] flex items-center justify-end gap-[20px]'>
            {!showSearch &&<IoSearchCircleOutline className='w-[38px] h-[38px] text-[#000000] cursor-pointer'
            onClick={() => {setShowSearch(prev => !prev); navigate('/collections')}}/> } 
             {showSearch && 
              <IoSearchCircleSharp
 className='w-[38px] h-[38px] text-[#000000] cursor-pointer'
            onClick={() => setShowSearch(prev => !prev)}
            />}
            
{!userData ? (
  <FaCircleUser className='w-[29px] h-[29px] text-[#000000] cursor-pointer'
  onClick={() => setShowProfile(prev => !prev)}
    />
) : (
  <div className='w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full 
  flex items-center justify-center cursor-pointer' onClick= {()=>setShowProfile(prev => !prev)}>
    {userData?.name ? userData.name.slice(0, 1).toUpperCase() : 'U'}
  </div>
)}
            
            <MdOutlineShoppingCart className='w-[30px] h-[30px] text-[#000000] cursor-pointer
            hidden md:block'  onClick = {()=> navigate('/cart')}/>
            <p className="absolute w-[18px] h-[18px] items-center md:flex justify-center
             bg-black px-[5px] py-[2px] text-white rounded-full text-[9px]
             top-[10px] right-[23px] hidden ">{getCardCount()}</p>



        </div>
         
         {
            showSearch  &&
             <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex 
        items-center justify-center'>
            <input type="text" className='w-[80%] lg:w-[50%] h-[60%] bg-[#233533] 
            rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[15px] lg:text-[18px]'
            placeholder='Search Here'
              onChange = {(e)=> {setSearch(e.target.value)}}
                value={search}/>

        </div>
         }
            
            {
                showProfile &&
                 <div className ='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%]
           border-[1px] border-[#aaa9a9] rounded-[10px] z-10'
           >


             <ul className=' w-[100%] h-[100%] flex flex-col items-start justify-around
              text-[17px] py-[10px]  text-[white]'>
               {userData &&  <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px]
                cursor-pointer" onClick={()=>{
                    handleLogout()
                    setShowProfile(false)
                    toast.success("Logged out successfully")
                }}>Logout</li>}
                {
                    !userData &&  <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px]
                cursor-pointer" onClick={()=>{navigate('/login'); }
                }>Login</li>
                }
                <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px]
                cursor-pointer"
                onClick={() =>  {
                  navigate('/order')
                   setShowProfile(false)
                }
                }>Orders</li>
                <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px]
                cursor-pointer"
                onClick={() =>{ navigate('/about')
                  setShowProfile(false)
                }}>About</li>
             </ul>
           </div>
            }


            <div className="w-[100vw] h-[90px] flex items-center justify-between
            px-[20px] fixed bottom-0 left-0 bg-[#191818] md:hidden
            text-[16px]">

                 <button className="text-[white] flex items-center justify-center
                 gap-[2px] flex-col">
                     <IoHome className='w-[30px] h-[30px] text-[#ffffff] md:hidden
                     cursor-pointer'
                     onClick={() => navigate('/')}/>

                    Home</button>
                 <button className="text-[white] flex items-center justify-center
                 gap-[2px] flex-col">
                     <VscCollectionSmall className='w-[30px] h-[30px] text-[#ffffff] md:hidden
                     cursor-pointer'
                     onClick={() => navigate('/collections')}/>

                   Collections</button>
                 <button className="text-[white] flex items-center justify-center
                 gap-[2px] flex-col">
                     <MdConnectWithoutContact className='w-[30px] h-[30px] text-[#ffffff] md:hidden
                     cursor-pointer'
                     onClick={() => navigate('/contact')}/>

                    Contact</button>
                 <button className="text-[white] flex items-center justify-center
                 gap-[2px] flex-col">
                     <MdOutlineShoppingCart className='w-[30px] h-[30px] text-[#ffffff] md:hidden
                     cursor-pointer' onClick = {()=> navigate('/cart')}/>

                    Cart</button>
                        <p className="absolute w-[18px] h-[18px] items-center flex justify-center
            text-black px-[5px] py-[2px] bg-white font-semibold rounded-full text-[9px]
             top-[8px] right-[18px]  ">{getCardCount()}</p>

            </div>

        </div>
     )
   }

   export default Nav