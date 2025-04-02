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
}

// Card component with props
function CardComponent({ title, description, image, alt }: CardProps) {
  return (
    <div className="max-w-[300px] bg-white border border-pink-500 hover:border-blue-500 rounded-lg shadow-sm dark:bg-gray-800 transition-transform transform hover:scale-101 gap-4">
      <div className="relative">
        <img
          src={image}
          alt={alt}
          className="w-full h-[300px] object-fit rounded-t-lg"
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
          <div className="text-gray-500 hover:text-pink-700 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
    </div>
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
    },
    {
      title: "Card 2 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image2,
      alt: "Card 2 Image",
    },
    {
      title: "Card 3 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image3,
      alt: "Card 3 Image",
    },
    {
      title: "Card 4 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image4,
      alt: "Card 4 Image",
    },
    {
      title: "Card 4 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: imgae5,
      alt: "Card 4 Image",
    },
    {
      title: "Card 4 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: imgae6,
      alt: "Card 4 Image",
    },
    {
      title: "Card 4 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: imgae7,
      alt: "Card 4 Image",
    },
    {
      title: "Card 4 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: imgae5,
      alt: "Card 4 Image",
    },
    {
      title: "Card 4 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: imgae7,
      alt: "Card 4 Image",
    },
    {
      title: "Card 4 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: imgae9,
      alt: "Card 4 Image",
    },
    {
      title: "Card 2 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image2,
      alt: "Card 2 Image",
    },
    {
      title: "Card 3 Title",
      description:
        "Parents, join your little ones in exploring this beautiful world of  folklore and adventure. With interactive elements and shared reading  modes, create lasting memories as you guide their journey through  enchanting tales.",
      image: image3,
      alt: "Card 3 Image",
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
        />
      ))}
    </div>
  );
}
