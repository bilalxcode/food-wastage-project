import Header from "./Header";
import ImageBox from "./ImageBox";
import PageHeader from "./PageHeader";
import Footers from './Footers';

export default function Story() {
  return (
    <div>
      <Header/>
      <PageHeader headertitle="Story" />
    <ImageBox/> 
    <Footers/>
    </div>
  )
}
