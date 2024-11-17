import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageDisplay from "../src/pages/components/ImageDisplay";
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
  const [content, setContent] = useState<ContentSection[] | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/load_data/${courseId}.json`
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

  const renderContent = (section: ContentSection): React.ReactNode => {
    if (!section || !section.type) {
      console.error("Invalid section:", section);
      return null;
    }

    const { type, content } = section;

    if (!content && type !== "break" && type !== "img") {
      console.warn(`Content is null or undefined for section type: ${type}`);
      return null;
    }

    switch (type) {
      case "span":
        if (typeof content === "string") {
          return <p>{content}</p>;
        }
        if (Array.isArray(content)) {
          return (
            <p>
              {content.map((sub, i) => {
                if (sub.type === "inline-code") {
                  return (
                    <code key={i} className="inline-code">
                      {sub.content}
                    </code>
                  );
                }
                return <span key={i}>{sub.content}</span>;
              })}
            </p>
          );
        }
        return null;

      case "img":
        if (section.src) {
          return (
            <div className="image-container">
              <ImageDisplay src={section.src} />
            </div>
          );
        }
        console.warn("Image source (src) is missing.");
        return null;

      case "ul":
        if (section.elements) {
          return (
            <ul className="content-list">
              {section.elements.map((element, i) => (
                <li key={i}>
                  {element.type === "link" ? (
                    <a href={element.url} className="content-link">
                      {element.content}
                    </a>
                  ) : (
                    element.content
                  )}
                </li>
              ))}
            </ul>
          );
        }
        console.warn("List elements are missing.");
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
        if (content && typeof content === "object") {
          return (
            <div id={section.id} className="anchor-section">
              {renderContent(content as ContentSection)}
            </div>
          );
        }
        console.warn("Anchor content is missing or invalid.");
        return null;

      case "example-block":
        if (typeof content === "string") {
          return <div className="example-block">{content}</div>;
        }
        console.warn("Example block content is missing or invalid.");
        return null;

      case "important-block":
        if (typeof content === "string") {
          return <div className="important-block">{content}</div>;
        }
        console.warn("Important block content is missing or invalid.");
        return null;

      default:
        console.error("Unsupported section type:", type);
        return null;
    }
  };

  return (
    <div className="content-page">
      <h1 className="content-title">{courseId}</h1>
      <div className="content-body">
        {content?.map((section, index) => (
          <div key={index} className="content-section">
            {renderContent(section)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
