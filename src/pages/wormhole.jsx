import WormholeSteps from "@/components/WormholeSteps";
export default function Wormhole() {
  return (
    <WormholeSteps
      title={"Our services"}
      content={
        <p>
          In collaboration with Better Booch we developed the art direction for
          their relaunch including a bouquet of ingredient illustrations, new
          photography and a design focused on their distinct flavors and
          conversion. The e-commerce store was even featured on
          <a
            href="https://www.shopify.com/blog/subscription-case-study-better-booch"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shopify's blog
          </a>
          as a fantastic performer, specifically with its subscription flow.
        </p>
      }
      stepList={[
        { text: "Content Production", offset: 0 },
        { text: "Art Direction", offset: 0 },
        { text: "Responsive Design", offset: 0 },
        { text: "Development", offset: 0 },
        { text: "Conversion", offset: 0 },
      ]}
    />
  );
}
