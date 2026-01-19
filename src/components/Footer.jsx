import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t-4 border-red-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-black to-gray-900 z-0"></div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16 relative z-10 animate-fade-in-up">
        
        {/* Column 1: Subscribe */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold tracking-wider">Exclusive</h2>
          <div className="flex flex-col gap-2">
             <h3 className="text-xl font-medium">Subscribe</h3>
             <p className="text-sm text-gray-400">Get 10% off your first order</p>
          </div>
          
          <div className="relative group">
            <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-2 border-gray-700 text-white pl-4 pr-12 py-3 w-full rounded outline-none focus:border-red-600 transition-colors text-sm placeholder:text-gray-600"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </button>
          </div>
        </div>

        {/* Column 2: Support */}
        <div className="flex flex-col gap-6">
            <h3 className="text-xl font-medium">Support</h3>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
                <p className="leading-relaxed hover:text-white transition-colors cursor-default">
                    Shirdi <br />
                    Maharashtra, India
                </p>
                <p className="hover:text-red-500 transition-colors cursor-pointer">exclusive@gmail.com</p>
                <p className="hover:text-red-500 transition-colors cursor-pointer">+91 9876543210</p>
            </div>
        </div>

        {/* Column 3: Account */}
        <div className="flex flex-col gap-6">
            <h3 className="text-xl font-medium">Account</h3>
            <ul className="text-sm text-gray-400 flex flex-col gap-3">
                <li><a href="#" className="hover:text-red-500 hover:translate-x-1 transition-all inline-block">My Account</a></li>
                <li><a href="#" className="hover:text-red-500 hover:translate-x-1 transition-all inline-block">Login / Register</a></li>
                <li><a href="#" className="hover:text-red-500 hover:translate-x-1 transition-all inline-block">Cart</a></li>
                <li><a href="#" className="hover:text-red-500 hover:translate-x-1 transition-all inline-block">Wishlist</a></li>
                <li><a href="#" className="hover:text-red-500 hover:translate-x-1 transition-all inline-block">Shop</a></li>
            </ul>
        </div>
        
         {/* Column 4: Quick Link */}
        <div className="flex flex-col gap-6">
            <h3 className="text-xl font-medium">Quick Link</h3>
            <ul className="text-sm text-gray-400 flex flex-col gap-3">
                <li><a href="#" className="hover:text-red-500 hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-red-500 hover:translate-x-1 transition-all inline-block">Terms Of Use</a></li>
                <li><a href="#" className="hover:text-red-500 hover:translate-x-1 transition-all inline-block">FAQ</a></li>
                <li><a href="#" className="hover:text-red-500 hover:translate-x-1 transition-all inline-block">Contact</a></li>
            </ul>
        </div>

         {/* Column 5: Download App */}
        <div className="flex flex-col gap-6">
             <div className="flex flex-col gap-2">
                 <h3 className="text-xl font-medium">Download App</h3>
                 <p className="text-xs text-gray-500">Save ₹250 with App New User Only</p>
             </div>
             
             <div className="flex gap-3 items-center">
                 {/* QR Code */}
                 <div className="bg-white p-2 rounded-sm w-24 h-24 shadow-lg hover:scale-105 transition-transform duration-300">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" className="w-full h-full object-contain"/>
                 </div>
                 <div className="flex flex-col gap-2">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 object-contain cursor-pointer hover:brightness-110 transition-all" />
                     <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 object-contain cursor-pointer hover:brightness-110 transition-all" />
                 </div>
             </div>
             
             <div className="flex gap-6 mt-2">
                 <a href="#" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
                 <a href="#" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
                 <a href="#" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.416 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 014.18 3.384c.636-.247 1.363-.416 2.427-.465C7.674 2.012 8.029 2 12.315 2zm-3.19 8.413a3.191 3.191 0 100 6.382 3.191 3.191 0 000-6.382zm0-2.128a5.319 5.319 0 110 10.638 5.319 5.319 0 010-10.638zm6.593-1.276a1.276 1.276 0 110 2.552 1.276 1.276 0 010-2.552z" clipRule="evenodd" /></svg></a>
                 <a href="#" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.554-1.235c.678-.05 1.376-.125 2.072-.228 1.056-.153 1.838-.285 2.679-.425zm-2.975 6.33c.488 2.083.504 4.398.073 6.643a8.517 8.517 0 01-6.105-1.92 5.062 5.062 0 01-.157-.91 189.605 189.605 0 015.694-1.972 6.945 6.945 0 011.196-1.571 5.034 5.034 0 01-.701-.27zM12 20.496c-2.317 0-4.423-.925-5.968-2.428.163-.11.352-.206.568-.287 1.956-.732 6.002-1.467 8.017-.552.016.03.071.045.107l.001.003c.522 1.258.74 2.37.5 3.018A8.455 8.455 0 0112 20.496zM3.503 12c.007-.06.012-.12.022-.179.791.246 3.655.978 6.01 1.026-.06.18-.125.358-.19.535-3.044 1.706-5.1 3.541-5.748 4.295A8.47 8.47 0 013.503 12zm.23-1.636c.264-.47.568-.916.904-1.32.748.16 2.508.435 4.646.223a26.234 26.234 0 011.025-2.585c-.927-.375-3.033-1.077-5.903-.703a8.47 8.47 0 01-.672 4.385zm12.368-2.613a22.26 22.26 0 00-1.722-2.355c2.378-.293 4.204-.047 4.707.067a8.498 8.498 0 01-2.985 2.288zM10.89 3.633a25.04 25.04 0 00-1.4 3.424c-1.897.108-3.475-.02-3.882-.073A8.52 8.52 0 0110.89 3.633z" clipRule="evenodd" /></svg></a>
             </div>
        </div>
      </div>
      
      <div className="relative z-10 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© Copyright 2026. All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
