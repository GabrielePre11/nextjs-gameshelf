import Container from "@/layout/Container";
import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section className="pt-24" aria-label="Hero Section">
      <Container>
        <Image
          src={"/Cyberpunk-Banner.jpg"}
          alt="Cyberpunk banner"
          width={1000}
          height={1000}
          className="w-full aspect-video sm:aspect-auto object-cover object-left rounded-lg"
          priority={true}
        ></Image>
      </Container>
    </section>
  );
}
