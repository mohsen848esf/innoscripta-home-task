import React, { FC } from "react";
import { shortText, dateFormater } from "../../utils/helper";

interface INewsCard {
  image?: string;
  title: string;
  description?: string;
  author: string;
  link: string;
  createDate: string;
  category?: string;
  source?: string;
}

const NewsCard: FC<INewsCard> = ({
  image,
  title,
  description,
  author,
  link,
  createDate,
}) => {
  return (
    <a
      href={link}
      className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-lg cursor-pointer dark:bg-gray-900 dark:text-gray-100 "
    >
      <div>
        <img
          src={image}
          alt={createDate}
          className="object-cover w-full mb-4 h-60 sm:h-60 dark:bg-gray-500"
        />
        <h2 className="mb-1 text-left text-xl font-semibold h-16 truncate  ">
          {shortText(title)}
        </h2>
        <p className="text-sm dark:text-gray-400 text-left h-20  overflow-hidden text-ellipsis">
          {description ? shortText(description) : shortText(title)}
        </p>
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="space-x-2">
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-semibold">{author}</span>
              <span className="text-xs dark:text-gray-400">
                {dateFormater(createDate)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
