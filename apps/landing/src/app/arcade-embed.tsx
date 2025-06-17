export function ArcadeEmbed() {
  return (
    <div className='max-w-4xl mx-auto'>
      <div
        style={{
          position: "relative",
          paddingBottom: "calc(58.29931972789115% + 41px)",
          height: 0,
          width: "100%",
        }}
      >
        <iframe
          src='https://demo.arcade.software/FvLafEYXCbfTtDk3BcdZ?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true'
          title='Submit and Track Feature Requests in aura.vote'
          frameBorder='0'
          loading='lazy'
          allowFullScreen
          allow='clipboard-write'
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            colorScheme: "light",
          }}
        />
      </div>
    </div>
  );
}
