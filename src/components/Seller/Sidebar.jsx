import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div class="   bg-[#2ac127] fixed w-full lg:hidden  py-4 text-start flex justify-between pr-7">
        <button
          type="button"
           aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-offcanvas-example"
          aria-label="Toggle navigation"
          data-hs-overlay="#hs-offcanvas-example"
        >
          
      <svg width="117px" height="44px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#ffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>

</svg>
        </button>
        
        <Link to="/Profile">
        <svg className="" width="40px" height="40px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <title>profile_round [#1345]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-420.000000, -2119.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M378.083123,1964.99998 C378.083123,1962.79398 376.251842,1960.99998 374,1960.99998 C371.748158,1960.99998 369.916877,1962.79398 369.916877,1964.99998 C369.916877,1967.20598 371.748158,1968.99998 374,1968.99998 C376.251842,1968.99998 378.083123,1967.20598 378.083123,1964.99998 M381.945758,1978.99998 L380.124685,1978.99998 C379.561214,1978.99998 379.103904,1978.55198 379.103904,1977.99998 C379.103904,1977.44798 379.561214,1976.99998 380.124685,1976.99998 L380.5626,1976.99998 C381.26898,1976.99998 381.790599,1976.30298 381.523154,1975.66198 C380.286989,1972.69798 377.383888,1970.99998 374,1970.99998 C370.616112,1970.99998 367.713011,1972.69798 366.476846,1975.66198 C366.209401,1976.30298 366.73102,1976.99998 367.4374,1976.99998 L367.875315,1976.99998 C368.438786,1976.99998 368.896096,1977.44798 368.896096,1977.99998 C368.896096,1978.55198 368.438786,1978.99998 367.875315,1978.99998 L366.054242,1978.99998 C364.778266,1978.99998 363.773818,1977.85698 364.044325,1976.63598 C364.787453,1973.27698 367.107688,1970.79798 370.163906,1969.67298 C368.769519,1968.57398 367.875315,1966.88998 367.875315,1964.99998 C367.875315,1961.44898 371.023403,1958.61898 374.733941,1959.04198 C377.422678,1959.34798 379.650022,1961.44698 380.05323,1964.06998 C380.400296,1966.33098 379.456073,1968.39598 377.836094,1969.67298 C380.892312,1970.79798 383.212547,1973.27698 383.955675,1976.63598 C384.226182,1977.85698 383.221734,1978.99998 381.945758,1978.99998 M377.185857,1974.46398 C377.584982,1974.85498 377.584982,1975.48798 377.185857,1975.87898 L374,1978.99998 L371.834924,1976.87898 C371.435799,1976.48798 371.435799,1975.85498 371.834924,1975.46398 L371.834924,1975.46398 C372.233028,1975.07398 372.879183,1975.07398 373.278308,1975.46398 L374,1976.17198 L375.742473,1974.46398 C376.141598,1974.07398 376.787752,1974.07398 377.185857,1974.46398" id="profile_round-[#1345]"> </path> </g> </g> </g> </g>

</svg>
        </Link>


      </div>

      <div
        id="hs-offcanvas-example"
        class="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform
         hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto 
         lg:block lg:translate-x-0 lg:end-auto lg:bottom-0  text-black
          "
        role="dialog"
        tabindex="-1"
        aria-label="Sidebar"
      >
        <div class="px-6">
          <a
            class="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
            href="#"
            aria-label=" Bambe Shop"
          >
            Bambe Shop
          </a>
        </div>
        <nav
          class="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul class="space-y-1.5">
            <Link to="/Dashboard">
              <a
                class="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-slate-500 dark:bg-neutral-700 dark:text-white"
                href="#"
              >
                <svg
                  class="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                All products
                </a>
            </Link>
            <br />
            <Link className="" to="/Addproduct">
              <a
                class="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-slate-500 dark:bg-neutral-700 dark:text-white"
                href="#"
              >
                <svg
                  class="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Add product
              </a>
            </Link>
            <br/>
            <Link to="/Orders">
              <a
                class="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-slate-500 dark:bg-neutral-700 dark:text-white"
                href="#"
              >
                <svg
                  class="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Orders
              </a>
            </Link>
 
          </ul>
        </nav>
      </div>

     </>
  );
}
