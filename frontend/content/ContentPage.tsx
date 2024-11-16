import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ContentPage.css";

interface InlineContent {
  type: string;
  content: string;
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

        console.log("Fetched content:", data.content);

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
    if (!section.content) return null;

    switch (section.type) {
      case "span":
        if (typeof section.content === "string") {
          return <p>{section.content}</p>;
        }
        if (Array.isArray(section.content)) {
          return (
            <p>
              {section.content.map((sub, i) =>
                sub.type === "inline-code" ? (
                  <code key={i} className="inline-code">
                    {sub.content}
                  </code>
                ) : (
                  <span key={i}>{sub.content}</span>
                )
              )}
            </p>
          );
        }
        return null;

      case "img":
        return (
          <div className="image-container">
            <img src={section.src} alt="" className="content-image" />
          </div>
        );

      case "ul":
        if (section.elements) {
          return (
            <ul className="content-list">
              {section.elements.map((element, i) => (
                <li key={i}>{element.content}</li>
              ))}
            </ul>
          );
        }
        return null;

      case "code":
        if (typeof section.content === "string") {
          return (
            <pre className="code-block">
              <code>{section.content}</code>
            </pre>
          );
        }
        return null;

      case "h3":
        if (typeof section.content === "string") {
          return <h3 className="content-heading">{section.content}</h3>;
        }
        return null;

      case "example-block":
        if (typeof section.content === "string") {
          return (
            <div className="example-block">
              <p>{section.content}</p>
            </div>
          );
        }
        return null;

      case "important-block":
        if (typeof section.content === "string") {
          return (
            <div className="important-block">
              <strong>{section.content}</strong>
            </div>
          );
        }
        return null;

      case "anchor":
        if (typeof section.content === "object" && "type" in section.content) {
          return (
            <div id={section.id} className="content-anchor">
              {renderContent(section.content as ContentSection)}
            </div>
          );
        }
        console.error("Invalid content for anchor:", section.content);
        return null;

      case "break":
        return <br />;

      default:
        console.error("Unsupported section type:", section.type);
        return null;
    }
  };

  if (content === null) {
    return <p>Loading content...</p>;
  }

  return (
    <div className="content-page">
      <h1 className="content-title">{courseId}</h1>
      <div className="content-body">
        {content.map((section, index) => (
          <div key={index} className="content-section">
            {renderContent(section)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
