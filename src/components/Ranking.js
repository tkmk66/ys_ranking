// src/components/Ranking.js
import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card'; // 追加
import Typography from 'material-ui/Typography'; // 追加
import Button from 'material-ui/Button'; // 追加


export default class Ranking extends React.Component {
  componentWillMount() {
    this.props.onMount(this.props.categoryId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.categoryId !== nextProps.categoryId) {
      this.props.onUpdate(nextProps.categoryId);
    }
  }

  render() {
    const { category, ranking, error } = this.props;

    return (
      <div>
        {/* ランキングのタイトル（2の機能） */}
        <h2>{
          typeof category !== 'undefined'
            ? `${category.name}のランキング`
            : ''
        }</h2>

        {(() => {
          if (error) {
            // エラー表示
            return <p>エラーが発生しました。リロードしてください。</p>;
          } else if (typeof ranking === 'undefined') {
            // リクエスト完了前
            return <p>読み込み中...</p>;
          } else {
            // ランキングの表示（3の機能）
            return ranking.map((item, i) => (
              <Card
                key={`ranking-item-${item.code}`}
                style={{ maxWidth: '500px', margin: '32px auto' }}
              >
                <CardMedia
                  image={item.imageUrl}
                  title={`${i + 1}位 ${item.name}`}
                  style={{ height: '200px', backgroundSize: 'auto' }}
                />
                <CardContent>
                  <Typography type="title">
                    {`${i + 1}位 ${item.name}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    raised
                    color="secondary"
                    fullWidth
                    href={item.url}
                  >商品ページへ</Button>
                </CardActions>
              </Card>
            ));
          }
        })()}
      </div>
    );
  }
}

Ranking.propTypes = {
  categoryId: PropTypes.string.isRequired,
  onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,

  // category, ranking, errorの型を追加
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  ranking: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ),
  error: PropTypes.bool.isRequired
};
Ranking.defaultProps = {
  categoryId: '1'
};