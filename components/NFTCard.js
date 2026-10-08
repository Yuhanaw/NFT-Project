export default function NFTCard({ title, image, price, edition, description }) {
  return (
    <article className="nft-card">
      <div className="nft-image-wrap">
        <img src={image} alt={title} />
      </div>

      <div className="nft-card-body">
        <div className="nft-card-top">
          <h3>{title}</h3>
          <span>{edition}</span>
        </div>

        <p>{description}</p>

        <div className="nft-card-bottom">
          <span>Current bid</span>
          <strong>{price}</strong>
        </div>
      </div>
    </article>
  );
}
