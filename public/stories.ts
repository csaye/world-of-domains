import { rotations } from "./rotations";

export type Story = {
  domain: string,
  date: string,
  description: string,
  image: string,
  archive: string,
  rotation: [number, number, number]
};

export const stories: Story[] = [
  {
    domain: "symbolics.com",
    date: "March 15, 1985",
    description: "Defunct computer manufacturer Symbolics, Inc. registers symbolics.com, the first ever .com domain.",
    image: "symbolics.png",
    archive: "https://web.archive.org/web/19981207002851/http://stony-brook.scrc.symbolics.com/www/index.html"
  },
  {
    domain: "berkeley.edu",
    date: "April 24, 1985",
    description: "UC Berkeley, alongside Carnegie Mellon, Purdue, Rice, and UCLA, registers the first .edu domain.",
    image: "berkeley.png",
    archive: "https://web.archive.org/web/20000510065823/http://www.berkeley.edu/"
  },
  {
    domain: "apple.com",
    date: "February 2, 1987",
    description: "Technology company Apple Inc. registers apple.com. Apple would become the first company to hit a $3 trillion USD market cap in 2022.",
    image: "apple.png",
    archive: "https://web.archive.org/web/19970404064352/http://www.apple.com/"
  },
  {
    domain: "fb.com",
    date: "May 22, 1990",
    description: "The American Farm Bureau Federation registers fb.com. The domain would be acquired by Facebook in 2010 for $8.5 million USD, making it one of the largest domain sales in history.",
    image: "fb.png",
    archive: "https://web.archive.org/web/19970426080406/http://www.fb.com/"
  },
  {
    domain: "nissan.com",
    date: "June 4, 1994",
    description: "Uzi Nissan registers nissan.com for his computer company Nissan Computer Corporation. Nissan Motors sued him for the domain, with the court ruling in Uzi Nissan's favor after a multi-million dollar legal battle. Nissan Motors uses nissanusa.com to this day.",
    image: "nissan.png",
    archive: "https://web.archive.org/web/20050106044445/http://nissan.com/"
  },
  {
    domain: "amazon.com",
    date: "November 1, 1994",
    description: "Jeff Bezos registers amazon.com to found an online bookstore. Amazon.com, Inc. would become the second American company to hit a $1 trillion market cap in 2018.",
    image: "amazon.png",
    archive: "https://web.archive.org/web/19991231113656/http://www.amazon.com/exec/obidos/subst/home/home.html"
  },
  {
    domain: "facebook.com",
    date: "March 29, 1997",
    description: "Customer experience company AboutFace Corporation registers facebook.com. The domain would be acquired by Facebook in 2005 for $200,000 USD.",
    image: "facebook.png",
    archive: "https://web.archive.org/web/20000915172800/http://facebook.com/"
  },
  {
    domain: "google.com",
    date: "September 15, 1997",
    description: "Technology company Google LLC's domain google.com is registered. Its parent company, Alphabet Inc., would become the third American company to hit a $2 trillion USD market cap in 2021.",
    image: "google.png",
    archive: "https://web.archive.org/web/19981202230410/http://www.google.com/"
  },
  {
    domain: "mikerowesoft.com",
    date: "August 5, 2003",
    description: "Canadian high schooler Mike Rowe registers mikerowesoft.com for his web design business. He would later be sued by Microsoft, settling out of court for an Xbox among other compensation.",
    image: "mikerowesoft.png",
    archive: "https://web.archive.org/web/20040119183850/http://mikerowesoft.com/"
  },
  {
    domain: "thefacebook.com",
    date: "January 11, 2004",
    description: "Mark Zuckerberg registers thefacebook.com to launch his social networking site. Facebook hosts over 2.9 billion montly active users as of 2022.",
    image: "thefacebook.png",
    archive: "https://web.archive.org/web/20040212031928/http://www.thefacebook.com/"
  }
].map((data, i) => ({ ...data, rotation: rotations[i] }));
