
import BasicScene from './BasicScene-chagpt'
import BasicSceneChagpt from './BasicScene-chagpt'
import ThreeDByPerplexity from './3d-by-perplexity'
import ThreeDByGrok from './3d-by-grok'

export default function APITestPage() {
  return (
    <div className="flex flex-col gap-12 py-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">BasicScene</h2>
        <BasicScene />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">BasicScene-chagpt</h2>
        <BasicSceneChagpt />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">3d-by-perplexity</h2>
        <ThreeDByPerplexity />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">3d-by-grok</h2>
        <ThreeDByGrok />
      </div>
    </div>
  )
}
