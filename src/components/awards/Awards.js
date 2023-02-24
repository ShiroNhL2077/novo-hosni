import './awards.css'

export default function Awards () {
    return (
      <div class="container-fluid h-100 bg-black">
        <div class="row align-items-center h-100">
          <div class="container rounded-5 bg-dark">
            {/* changed title */}
            <h1 class="text-center text-light">NOVOBAR® HONORS :</h1>
            <div class="slider">
              <div class="logos my-3">
                <img src="awards/award-img-1.jpg" class="logo px-5" alt="" />
                <img src="awards/award-img-2.jpg" class="logo px-5" alt="" />
                <img src="awards/award-img-3.png" class="logo px-5" alt="" />
                <img src="awards/award-img-4.jpg" class="logo px-5" alt="" />
                <img src="awards/award-img-5.png" class="logo px-5" alt="" />
              </div>
              {/* added all awards */}
              <div class="logos my-3">
                <img src="awards/award-img-6.png" class="logo" alt="" />
                <img src="awards/award-img-7.jpg" class="logo" alt="" />
                <img src="awards/award-img-8.png" class="logo" alt="" />
                <img src="awards/award-img-9.png" class="logo" alt="" />
                <img src="awards/award-img-10.png" class="logo" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}