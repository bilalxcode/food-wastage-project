import Header from "./Header";
import ImageBox from "./ImageBox";
import PageHeader from "./PageHeader";
import Footers from './Footers';
import ServicesBox from './ServicesBox';

export default function Story() {
  return (
    <div>
      <Header/>
      <PageHeader headertitle="Services" />
      <ServicesBox/>
    <Footers/>
    </div>
  )
}
