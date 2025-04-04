import "@fortawesome/fontawesome-free/css/all.min.css";
import image1 from "../../assets/images1.webp";
import image2 from "../../assets/images2.webp";
import image3 from "../../assets/images3.webp";
import image4 from "../../assets/images4.webp";
import imgae5 from "../../assets/images5.webp";
import imgae6 from "../../assets/images6.webp";
import imgae7 from "../../assets/images7.webp";
import imgae8 from "../../assets/imgae8.webp";
import imgae9 from "../../assets/imgea9.webp";
import { Link } from "react-router-dom"; // Import Link

const imagesArray = [
  image1,
  image2,
  image3,
  image4,
  imgae5,
  imgae6,
  imgae7,
  imgae8,
  imgae9,
];

// Define the props interface for the Card component
interface CardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  link?: string; // Add link prop
}

// Card component with props
function CardComponent({ title, description, image, alt, link }: CardProps) {
  return (
    <Link
      to={link || "#"}
      className="max-w-[300px] bg-white border border-pink-500 hover:border-blue-500 rounded-lg shadow-sm dark:bg-gray-800 transition-transform transform hover:scale-101 gap-4 block"
    >
      <div className="relative">
        <img
          src={image}
          alt={alt}
          className="w-full h-[280px] object-fit rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <div className="absolute bottom-2 left-2 text-white font-semibold text-sm">
          Black Desert
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800 text-pink-500">
            {title}
          </h2>
          <div className="text-gray-500 border-2 rounded-xl  border-pink-500 hover:text-pink-700 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 border-2 rounded-xl  border-pink-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

export default function Card() {
  const cardData = [
    {
      title: "Card 1 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image1,
      alt: "Card 1 Image",
      link: "/story/1",
    },
    {
      title: "Card 2 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image2,
      alt: "Card 2 Image",
      link: "/story/2",
    },
    {
      title: "Card 3 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image3,
      alt: "Card 3 Image",
      link: "/story/3",
    },
    {
      title: "Card 4 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image4,
      alt: "Card 4 Image",
      link: "/story/4",
    },
    {
      title: "Card 5 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: imgae5,
      alt: "Card 5 Image",
      link: "/story/5",
    },
    {
      title: "Card 6 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: imgae6,
      alt: "Card 6 Image",
      link: "/story/6",
    },
    {
      title: "Card 7 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: imgae7,
      alt: "Card 7 Image",
      link: "/story/7",
    },
    {
      title: "Card 8 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: imgae8,
      alt: "Card 8 Image",
      link: "/story/8",
    },
    {
      title: "Card 9 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: imgae9,
      alt: "Card 9 Image",
      link: "/story/9",
    },
    {
      title: "Card 10 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image2,
      alt: "Card 10 Image",
      link: "/story/10",
    },
    {
      title: "Card 11 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image3,
      alt: "Card 11 Image",
      link: "/story/11",
    },
    {
      title: "Card 12 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image1,
      alt: "Card 12 Image",
      link: "/story/12",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 pb-6">
      {cardData.map((card, index) => (
        <CardComponent
          key={index}
          title={card.title}
          description={card.description}
          image={card.image}
          alt={card.alt}
          link={card.link}
        />
      ))}
    </div>
  );
}
