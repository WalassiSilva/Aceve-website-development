"use client";
import Link from "next/link";
import { useState, type ComponentProps } from "react";
import type React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import clsx from "clsx";
import { MenuPrimaryButton } from "./Button";

interface ImenuHeader extends ComponentProps<"nav"> {
  logo?: string;
  logoSimios?: string;
  description?: string;
  icon?: React.ReactNode;
  options?: string[];
}
const menuOptions: string[] = [
  "Inicio",
  "Quem Somos",
  "Contato",
  "Brechó",
  "Grupo Símios",
  "Doe agora",
];

const headerDetails: ImenuHeader = {
  logo: "https://files.edgestore.dev/nh2rz4kiwkl7w411/publicImages/_public/post/8ec4791d-e61a-4e48-abb1-bcc54d343bbd.png",
  logoSimios:
    "https://files.edgestore.dev/nh2rz4kiwkl7w411/publicImages/_public/post/8487ce9f-664c-4a4d-a8de-287508c9996d.png",
  description: "Associação Cultural e Educacional Violeta Eliz",
  options: menuOptions,
};

export default function Mainmenu({
  logo,
  description,
  logoSimios,
  ...props
}: ImenuHeader) {
  const [isOpenMenu, setisOpenMenu] = useState<boolean>(false);
  return (
    <>
      <nav
        {...props}
        className="lg:flex lg:w-full lg:pr-8 lg:h-[80px] lg:pl-8 lg:items-center bg-white-normal drop-shadow-lg lg:relative"
      >
        <header
          className={clsx(
            "flex py-4 items-center h-14",
            "mobileSmall:h-20 lg:flex-row lg:w-[60%]"
          )}
        >
          <figure className="border-r-2 border-gray-stroker ml-4 ">
            <img
              src={headerDetails.logo}
              alt={headerDetails.description}
              className={clsx("w-20 pr-2", "mobileSmall:w-24", "lg:w-36")}
            />
            <figcaption className="sr-only">
              Esse é o logo da ong Violeta Eliz
            </figcaption>
          </figure>

          <h1
            className={clsx(
              "text-[10px] leading-none text-purple-light",
              "w-32 px-1",
              "mobileSmall:w-[45%] mobileSmall:px-12 mobileSmall:pl-2 mobileSmall:text-[12px] font-semibold",
              "md:text-[14px] md:w-[30%]",
              "mobileLarger:w-[35%]",
              "lg:w-[60%] lg:text-[12px]"
            )}
          >
            {headerDetails.description}
          </h1>

          <section className="lg:hidden donate-button-menu hidden gap-2 w-[360px] justify-center md:flex  lg:w-[50%] lg:justify-end xl:gap-1 ">
            <MenuPrimaryButton btnType="secondary" title="Brechó" />
            <MenuPrimaryButton btnType="primary" title="Doar Agora" />
          </section>

          <figure
            className={clsx(
              "flex items-center justify-end flex-1 mr-6 cursor-pointer",
              "md:mr-4",
              "lg:hidden"
            )}
            onClick={() => setisOpenMenu(!isOpenMenu)}
          >
            {isOpenMenu ? (
              <IoClose size={32} />
            ) : (
              <GiHamburgerMenu className="text-[24px] md:text-[32px]" />
            )}
          </figure>
        </header>

        <ul
          className={clsx(
            "h-screen w-screen flex flex-col items-center py-10 absolute transform transition-transform duration-500 ease-in-out",
            "lg:translate-x-0 bg-zinc-100 lg:h-20 lg:flex-row lg:relative lg:bg-white-normal",
            " xl:justify-end xl:text-[14px] gap-4",
            {
              "translate-x-0": isOpenMenu,
              "translate-x-full":
                !isOpenMenu,
            }
          )}
        >
          {menuOptions.map((items: string, index: number) => (
            <li
              key={index}
              className={clsx(
                "font-roboto lg:text-[12px] lg:text-center p-4 px-4 lg:px-2 lg:py-2",

                {
                  "ordered-list hover:text-purple-light lg:hover:bg-white rounded-md transition-all ease-out duration-1000 lg:ordered-list":
                    items !== menuOptions[5],
                }
              )}
            >
              <Link
                href={items.trim().replace(/\s+/g, "-").toLocaleLowerCase()}
              >
                {items == menuOptions[3] || items == menuOptions[5] ? (
                  <MenuPrimaryButton
                    btnType={items == menuOptions[3] ? "secondary" : "primary"}
                    title={items}
                  />
                ) : (
                  <span
                    className={clsx("flex", {
                      "lg:hidden": items === "Grupo Símios",
                    })}
                  >
                    {items}
                  </span>
                )}

                <figure
                  className={clsx("hidden", {
                    "lg:flex": items === "Grupo Símios",
                  })}
                >
                  <img src={headerDetails.logoSimios} alt="logo" />
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}