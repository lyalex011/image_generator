

function About() {
    return ( 
       
        <div className="flex  justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 mt-24 px-8 md:px-6">
         
          <section className="mb-8 ">
            <div className="grid  gap-4 md:grid-cols-2">
              <div className="mb-6 md:mb-0 ">
                <h2 className="mb-6 text-3xl font-bold">About</h2>
        
                <p className="text-neutral-500  pr-6 md:pr-12">
                  
                  At QuickPic Generator, we bring you a delightful experience of discovering and generating unique and stylish images for all your creative needs. Our website harnesses the power of the <a className="text-blue-600  hover:underline" href="https://picsum.photos/">Lorem Picsum API</a>, which utilizes the vast repository of <a className="text-blue-600  hover:underline" href="https://unsplash.com/">Unsplash.com's</a> captivating images. Embrace your creativity with our intuitive customization options. You have the power to choose the dimensions that best fit your project, from thumbnails to high-resolution masterpieces. Amplify the visual appeal by adding stunning effects like black and white or vibrant color, allowing you to set the mood for your designs.
                  
                </p>
              </div>
        
              <div className="mb-6 md:mb-0">
              <h2 className="mb-6 text-3xl font-bold">Frequently asked questions</h2>
                <p className="mb-4 font-bold">Are these images free to use?</p>
                <p className="mb-12 text-neutral-500 ">
                All images on this website are from <a className="text-blue-600  hover:underline" href="https://unsplash.com/license">Unsplash.com</a>. Their licence grants you an irrevocable, nonexclusive, worldwide copyright license to download, copy, modify, distribute, perform, and use photos from Unsplash for free, including for commercial purposes, without permission from or attributing the photographer or Unsplash. This license does not include the right to compile photos from Unsplash to replicate a similar or competing service.
                </p>
        
                <p className="mb-4 font-bold">What the difference beetwen "Copy link" and "Download" option?</p>
                <p className="mb-12 text-neutral-500 ">
                QuickPic offers two convenient options: "Download" image to save your chosen image in JPG or WebP format, and "Copy Link" to seamlessly embed the image on your live web projects. Empower your creativity with our stylish images and elevate your projects effortlessly!
                </p>
        
                <p className="mb-4 font-bold">
                  Why webp format doesn't work with blur settings?
                </p>
                <p className="mb-12 text-neutral-500 ">
                    With "Download" option we recommend you to save your chosen image in JPG format, as the WebP format doesn't support blur settings due to API limitations.
                </p>
              </div>
            </div>
          </section>
         
        </div>
        

      );
}

export default About;