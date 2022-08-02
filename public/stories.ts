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
    description: "Technology company Apple Inc. registers apple.com. Apple would become the first company to hit a $3 trillion market cap in 2022.",
    image: "apple.png",
    archive: "https://web.archive.org/web/19970404064352/http://www.apple.com/"
  },
  {
    domain: "fb.com",
    date: "May 22, 1990",
    description: "The American Farm Bureau Federation registers fb.com. The domain would be acquired by Facebook in 2010 for $8.5 million, making it one of the largest domain sales in history.",
    image: "fb.png",
    archive: "https://web.archive.org/web/19970426080406/http://www.fb.com/"
  },
  {
    domain: "meta.com",
    date: "February 21, 1991",
    description: "The meta.com domain is registered. It would be acquired by Mark Zuckerberg in 2015 and later become the new name of Facebook.",
    image: "meta.png",
    archive: "https://web.archive.org/web/20081105085650/http://www.meta.com/"
  },
  {
    domain: "microsoft.com",
    date: "May 2, 1991",
    description: "Microsoft Corporation registers microsoft.com. Microsoft would become the second American company to hit a $2 trillion market cap in 2021.",
    image: "microsoft.png",
    archive: "https://web.archive.org/web/19981205060735/http://microsoft.com/"
  },
  {
    domain: "tesla.com",
    date: "November 4, 1992",
    description: "Silicon Valley engineer Stuart Grossman registers tesla.com. The domain would be acquired by Tesla, Inc. in 2016 for $11 million.",
    image: "tesla.png",
    archive: "https://web.archive.org/web/20021125165605/http://tesla.com/"
  },
  {
    domain: "x.com",
    date: "April 2, 1993",
    description: "The domain x.com is registered. It would become an online bank in 1999 and eventually be renamed to PayPal. In 2017, Elon Musk, one of the co-founders of x.com, repurchased the domain and launched it as an empty page with a single x.",
    image: "x.png",
    archive: "https://web.archive.org/web/20000301045908/http://x.com/"
  },
  {
    domain: "nissan.com",
    date: "June 4, 1994",
    description: "Uzi Nissan registers nissan.com for his computer company Nissan Computer Corporation. Nissan Motors sued him for the domain, with the court ruling in Uzi Nissan's favor after a multi-million dollar legal battle. Nissan Motors uses nissanusa.com to this day.",
    image: "nissan.png",
    archive: "https://web.archive.org/web/20050106044445/http://nissan.com/"
  },
  {
    domain: "mcdonalds.com",
    date: "July 12, 1994",
    description: "Journalist John Quittner registers mcdonalds.com for a Wired Magazine article. \"Are you finding that the Internet is a big thing?\" a McDonalds representative asked Quittner. McDonalds would later acquire the domain in exchange for a $3,500 USD donation to a local computer lab.",
    image: "mcdonalds.png",
    archive: "https://web.archive.org/web/19961110083459/http://www.mcdonalds.com/"
  },
  {
    domain: "amazon.com",
    date: "November 1, 1994",
    description: "Jeff Bezos registers amazon.com to found an online bookstore. Amazon.com, Inc. would become the second American company to hit a $1 trillion market cap in 2018.",
    image: "amazon.png",
    archive: "https://web.archive.org/web/19991231113656/http://www.amazon.com/exec/obidos/subst/home/home.html"
  },
  {
    domain: "peta.org",
    date: "September 26, 1995",
    description: "Michael Doughney registers peta.org for his website titled \"People Eating Tasty Animals\". In 2001, Doughney was sued by PETA. The court ruled Doughney guilty of trademark infringement and transferred the domain to PETA.",
    image: "peta.png",
    archive: "http://www.doughney.net/tasty/"
  },
  {
    domain: "facebook.com",
    date: "March 29, 1997",
    description: "Customer experience company AboutFace Corporation registers facebook.com. The domain would be acquired by Facebook in 2005 for $200,000.",
    image: "facebook.png",
    archive: "https://web.archive.org/web/20000915172800/http://facebook.com/"
  },
  {
    domain: "google.com",
    date: "September 15, 1997",
    description: "Technology company Google LLC's domain google.com is registered. Its parent company, Alphabet Inc., would become the third American company to hit a $2 trillion market cap in 2021.",
    image: "google.png",
    archive: "https://web.archive.org/web/19981202230410/http://www.google.com/"
  },
  {
    domain: "cars.com",
    date: "February 12, 1998",
    description: "cars.com is registered as an online automotive website. cars.com would become the most expensive domain of all time, valued at $872 million by Gannet Co., Inc.",
    image: "cars.png",
    archive: "https://web.archive.org/web/20010917012143/http://www.cars.com/carsapp/national/?act=populate&ft=1&page=used&rd=30&rn=7&srv=adlocator&tf=quick_usedforsale-default.tmpl&zc="
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
  },
  {
    domain: "instagram.com",
    date: "June 4, 2004",
    description: "The domain instagram.com is registered, later acquired by Instagram in 2011. The social networking platform was bought by Facebook in 2012 for $1 billion and reached 1 billion users by 2018.",
    image: "instagram.png",
    archive: "https://web.archive.org/web/20110311073313/http://instagram.com/"
  },
  {
    domain: "youtube.com",
    date: "February 15, 2005",
    description: "youtube.com is registered and founded originally as an online dating service. In October 2006, YouTube would be bought by Google for $1.65 billion.",
    image: "youtube.png",
    archive: "https://web.archive.org/web/20060502203540/http://www.youtube.com/"
  },
  {
    domain: "twttr.com",
    date: "March 8, 2006",
    description: "Podcasting company Odeo launches twttr.com, a microblogging social network. Six months later, they would acquire twitter.com. Twitter agreed to a $44 billion buyout by Elon Musk in April 2022, which was later terminated.",
    image: "twitter.png",
    archive: "https://web.archive.org/web/20061127105010/http://twitter.com/"
  },
].map((data, i) => ({ ...data, rotation: rotations[i] }));
