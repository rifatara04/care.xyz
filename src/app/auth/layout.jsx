import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="lg:my-16 md:my-8 my-4 px-2">
      <div className="py-8 px-6 shadow bg-white rounded-2xl mx-auto max-w-3xl">
        <div className="grid lg:grid-cols-2 items-center">
          <div className="pe-4 flex flex-col items-center">
            <header>
              <figure className="max-lg:hidden w-20 h-20 mx-auto">
                <Image src={"/logo.png"} fill alt="" className="relative!" />
              </figure>
              <h1 className="text-xl text-center mt-8 lg:mb-5 mb-2">
                <span className="me-1">Welcome to</span>
                <span className="font-bold">
                  Care.<span className="text-primary">xyz</span>
                </span>
              </h1>
              <p className="max-lg:text-sm text-center text-neutral/80">
                One of the best personal care services
                <br />
                in Bangladesh
              </p>
            </header>
          </div>
          <div className="max-lg:pt-12 lg:ps-6 max-lg:max-w-lg mx-auto w-full lg:border-s lg:border-s-neutral/15">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
