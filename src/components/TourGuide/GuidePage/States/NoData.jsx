const NoData = () => {
  return (
    <div className="col-span-full">
      <div className="text-center p-10 max-w-3xl mx-auto border border-yellow-500 rounded-lg bg-yellow-100 text-yellow-700">
        <h2 className="text-2xl font-semibold mb-3">No Guide Available</h2>
        <p className="text-lg font-medium">
          It looks like there are no guides available at the moment. Please
          check back later or contact our support team for more information. 🙏
        </p>
      </div>
    </div>
  );
};

export default NoData;
