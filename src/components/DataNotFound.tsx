export default function DataNotFound({ message = "No data found." }) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 mb-4 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0v2m0-10a4 4 0 100-8 4 4 0 000 8zM4 21h16" />
        </svg>
        <p className="text-lg">{message}</p>
      </div>
    );
  }
  