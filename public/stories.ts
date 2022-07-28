export type Story = {
  date: string,
  domain: string,
  title: string,
  description: string,
  image: string,
  rotation: [number, number, number],
};

export const stories: Story[] = [
  {
    date: "yyyy-mm-dd",
    domain: "example.com",
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
    image: "example.png",
    rotation: [0, 0, 0]
  },
];
