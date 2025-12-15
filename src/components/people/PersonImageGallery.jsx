import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { PERSON_PLACEHOLDER } from "../../constants/images";

export default function PersonImageGallery({ images = [] }) {
  const [activeImage, setActiveImage] = useState(null);

  if (!images.length) return null;

  return (
    <>

      <Row className="g-3 mb-4">
        {images.slice(0, 8).map((src, idx) => (
          <Col key={idx} xs={6} md={4} lg={3}>
            <img
              src={src}
              alt=""
              loading="lazy"
              onClick={() => setActiveImage(src)}
              onError={e => {
                e.currentTarget.src = PERSON_PLACEHOLDER;
              }}
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: 6,
                cursor: "pointer",
              }}
            />
          </Col>
        ))}
      </Row>

      {/*  Lightbox Modal */}
      <Modal
        show={!!activeImage}
        onHide={() => setActiveImage(null)}
        centered
        size="lg"
      >
        <Modal.Body className="p-0">
          {activeImage && (
            <img
              src={activeImage.replace("/w300", "/original")}
              alt=""
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
