import { Filter, Search } from "lucide-react";

const DashboardProjectToolbar = () => (
  <div className="flex flex-col sm:flex-row justify-between items-center my-15">
    <div className="flex-1 w-full sm:max-w-[43vw] relative border-green-500/30 shadow-inner h-12 py-0.5 border rounded-md bg-green-900/15 backdrop-blur-sm">
      <Search className="absolute top-2 left-3 text-gray-400" />
      <input
        type="text"
        placeholder="Seach Projects..."
        className="w-full h-full text-white py-2 sm:py-0 pl-12 border-none outline-none"
      />
    </div>
    <div className="self-end mt-5 sm:mt-0 sm:self-auto flex items-center gap-2 ml-12">
      <Filter className="text-gray-300" />
      <div>
        <div className="border-green-500/30 shadow-inner h-10 py-0.5 border inline-block rounded-md bg-green-900/15 backdrop-blur-sm">
          <select className="w-full h-full text-white pl-4 border-none outline-none bg-green-800/15 capitalize">
            <option
              className="bg-green-950/90 p-2 text-sm sm:text-lg"
              value="all"
            >
              All
            </option>
            <option className="bg-green-950/90 p-2" value="react">
              react
            </option>
            <option className="bg-green-950/90 p-2" value="react-native">
              react-native
            </option>
            <option className="bg-green-950/90 p-2" value="next js">
              next js
            </option>
            <option className="bg-green-950/90 p-2" value="node js">
              node js
            </option>
            <option className="bg-green-950/90 p-2" value="mongo db">
              mongo db
            </option>
            <option className="bg-green-950/90 p-2" value="python">
              python
            </option>
            <option className="bg-green-950/90 p-2" value="php">
              php
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardProjectToolbar;
