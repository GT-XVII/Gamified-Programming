import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageDisplay from "../pages/LandingPageComponents/ImageDisplay";
import "./ContentPage.css";

interface InlineContent {
  type: string;
  content: string;
  url?: string;
}

interface NestedContentSection {
  type: string;
  content: ContentSection;
  id?: string;
}

interface ContentSection {
  type: string;
  content?: string | InlineContent[] | NestedContentSection | null;
  src?: string;
  elements?: InlineContent[];
  id?: string;
  url?: string;
}

const ContentPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentSection[] | null>(null);

  // Fetch content based on courseId
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5050/load_data/${courseId}.json`
        );
        const data = await response.json();

        if (Array.isArray(data.content)) {
          setContent(data.content as ContentSection[]);
        } else {
          console.error("Invalid content structure:", data.content);
          setContent([]);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent([]);
      }
    };

    fetchContent();
  }, [courseId]);

  // Recursive rendering function
  const renderContent = (section: ContentSection): React.ReactNode => {
    if (!section || !section.type) {
      console.error("Invalid or missing section:", section);
      return null;
    }

    const { type, content, elements, src, id } = section;

    switch (type) {
      case "span":
        if (Array.isArray(content)) {
          return (
            <span>
              {content.map((subContent, index) =>
                renderContent(subContent as ContentSection)
              )}
            </span>
          );
        }
        if (typeof content === "string") {
          return <span>{content}</span>;
        }
        console.warn("Unsupported span content:", content);
        return null;

      case "img":
        if (src) {
          return (
            <div className="image-container">
              <ImageDisplay src={src} />
            </div>
          );
        }
        console.warn("Image source (src) is missing.");
        return null;

      case "ul":
        if (Array.isArray(elements)) {
          return (
            <ul className="content-list">
              {elements.map((element, i) => (
                <li key={i}>{renderContent(element as ContentSection)}</li>
              ))}
            </ul>
          );
        }
        console.warn("List elements are missing or invalid.");
        return null;

      case "code":
        if (typeof content === "string") {
          return (
            <pre className="code-block">
              <code>{content}</code>
            </pre>
          );
        }
        console.warn("Code content is missing or invalid.");
        return null;

      case "h3":
        if (typeof content === "string") {
          return <h3 className="content-heading">{content}</h3>;
        }
        console.warn("Heading content is missing or invalid.");
        return null;

      case "h4":
        if (typeof content === "string") {
          return <h4 className="content-subheading">{content}</h4>;
        }
        console.warn("Subheading content is missing or invalid.");
        return null;

      case "break":
        return <br />;

      case "anchor":
        if (id && content) {
          return (
            <div id={id} className="content-anchor">
              {renderContent(content as ContentSection)}
            </div>
          );
        }
        console.warn("Anchor content is missing or invalid.");
        return null;

      case "important-block":
      case "example-block":
        if (Array.isArray(content)) {
          return (
            <div className={`${type}`}>
              {content.map((subContent, index) => (
                <div key={index}>{renderContent(subContent as ContentSection)}</div>
              ))}
            </div>
          );
        }
        console.warn(`${type} content is missing or invalid.`);
        return null;

      case "link":
        if (typeof section.url === "string" && typeof section.content === "string") {
          return (
            <a href={section.url} className="content-link">
              {section.content}
            </a>
          );
        }
        console.warn("Link content or URL is missing.");
        return null;

      default:
        console.warn("Unsupported section type:", type);
        return null;
    }
  };

  const handleQuizRedirect = () => {
    navigate(`/quiz/${courseId}`);
  };

  return (
    <div className="content-page">
      <h1 className="content-title">{courseId}</h1>
      <div className="content-body">
        {content &&
          content.map((section, index) => (
            <div key={index} className="content-section">
              {renderContent(section)}
            </div>
          ))}
      </div>
      <button className="quiz-button" onClick={handleQuizRedirect}>
        Go to Quiz
      </button>
    </div>
  );
};

export default ContentPage;
